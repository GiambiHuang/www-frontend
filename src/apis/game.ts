import { endpoint, gameMatchPublicKey, programId } from "@/constants/network";
import { BN, BorshCoder, EventParser, Program, web3 } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";

import { IDL } from "@/contracts/www";

import * as buffer from "buffer";
import { getGamePDA, getPlayerPDA, getPlayerStatsAccount } from "@/utils/www";
import dayjs from "dayjs";
window.Buffer = buffer.Buffer;

const connection = new Connection(endpoint, 'processed')
const anonymousProgram = new Program(IDL, programId, { connection });

export type GetGameResult = {
  config: {
    stakingCooldown: number;
    roundDuration: BN;
    roundSettlementDuration: BN;
    entranceFee: BN;
  },
  startTime: BN,
  state: {
    finished?: {};
    live?: {};
  },
  survivors: number,
  firstShooter: string,
}

export const getGame = async () => {
  try {
    const match = await anonymousProgram.account.match.fetch(gameMatchPublicKey);
    const [gamePDA] = getGamePDA(
      anonymousProgram.programId,
      match.number,
      gameMatchPublicKey,
    );
    const game = await anonymousProgram.account.game.fetch(gamePDA);
    return {
      config: match.gameCfg,
      startTime: game.startTime,
      state: game.state,
      survivors: game.survivors,
      firstShooter: game.round.firstShooter.toString(),
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getTimestamp = async () => {
  const slot = await connection.getSlot({ commitment: 'processed' });
  const timestamp = await connection.getBlockTime(slot);
  return timestamp ? timestamp * 1000 : Date.now();
}

export const getCurrentPlayers = async () => {
  const connection = new Connection(endpoint, 'confirmed');
  const eventParser = new EventParser(anonymousProgram.programId, new BorshCoder(anonymousProgram.idl));
  // const slot = await connection.getSlot();
  // // get the latest block (allowing for v0 transactions)
  // const block = await connection.getBlock(slot, {
  //   maxSupportedTransactionVersion: 0,
  // });
  const signs = await connection.getSignaturesForAddress(anonymousProgram.programId);
  const signatures = signs.map(s => s.signature);
  const txns = await connection.getTransactions(
    signatures,
    {
      maxSupportedTransactionVersion: 0,
    },
  );
  const match = await anonymousProgram.account.match.fetch(gameMatchPublicKey);
  const game = await getGame();

  const playerPDAs = [];
  const playerPublicKeys = [];
  let lastGameEndSignature = '';
  for (const txn of txns) {
    const { blockTime, meta } = txn || {};
    const events = eventParser.parseLogs(meta?.logMessages ?? []);
    const { value } = events.next();
    if (value?.name === 'JoinEvent' && (game?.startTime.toNumber() ?? 0) < (blockTime || 0)) {
      const publicKey = new web3.PublicKey(value?.data?.player as any);
      playerPublicKeys.push(publicKey);
      playerPDAs.push(getPlayerPDA(anonymousProgram.programId, match.number, publicKey)[0])
    }
    if (value?.name === 'EndEvent') {
      lastGameEndSignature = txn?.transaction.signatures[0] ?? '';
      break;
    }
  }

  const players = await anonymousProgram.account.player.fetchMultiple(playerPDAs);
  return {
    players: playerPublicKeys.map((publicKey, idx) => ({
      publicKey,
      lives: players[idx]?.lives,
      attacked: '',
    })),
    lastGameEndSignature,
  }
}

export const getAttackEvents = async (until?: string) => {
  const connection = new Connection(endpoint, 'confirmed');
  const config: Record<string, string> = {};
  if (until) {
    config.until = until;
  }
  const sign = await connection.getSignaturesForAddress(anonymousProgram.programId, config);
  const txns = await connection.getTransactions(
    sign.map(s => s.signature),
    {
      maxSupportedTransactionVersion: 0,
    },
  );
  const game = await getGame();

  const eventParser = new EventParser(anonymousProgram.programId, new BorshCoder(anonymousProgram.idl));
  const playerUpdate: Record<string, string> = {};
  for (const txn of txns) {
    const { blockTime, meta } = txn || {} ;
    const events = eventParser.parseLogs(meta?.logMessages ?? []);
    const { value } = events.next();
    if (value?.name === 'AttackEvent' && (game?.startTime.toNumber() || 0) < (blockTime || 0)) {
      const { attacker, target, targetLivesRemaining, playersRemaining } = value?.data;
      console.log('  ------    ');
      console.log('attacker:', attacker?.toString(), ', playersRemaining:', playersRemaining);
      console.log('target:', target?.toString(), ', targetLivesRemaining:', targetLivesRemaining);
      if (!targetLivesRemaining) {
        playerUpdate[(target as web3.PublicKey).toString()] = (attacker as web3.PublicKey).toString()
      }
    }
  }
  return playerUpdate;
}

export type LeaderboardPlayer = {
  publicKey: string;
  points: number;
  streak: number;
  wins: number;
}

export const getLeaderboard = async (): Promise<LeaderboardPlayer[]> => {
  try {
    const connection = new Connection(endpoint, 'confirmed')
    const sign = await connection.getSignaturesForAddress(anonymousProgram.programId);
    const txns = await connection.getTransactions(sign.map(s => s.signature));

    const eventParser = new EventParser(anonymousProgram.programId, new BorshCoder(anonymousProgram.idl));
    const playerPDAs = [];
    const playerPublicKeys: string[] = [];
    for (const txn of txns) {
      const { meta } = txn || {} ;
      const events = eventParser.parseLogs(meta?.logMessages ?? []);
      const { value } = events.next();
      if (value?.name === 'JoinEvent') {
        const publicKey = new web3.PublicKey(value?.data?.player as any).toString();
        if (!playerPublicKeys.includes(publicKey)) {
          playerPublicKeys.push(publicKey);
          playerPDAs.push(getPlayerStatsAccount(anonymousProgram.programId, new web3.PublicKey(publicKey))[0])
        }
      }
    }

    const players = await anonymousProgram.account.stats.fetchMultiple(playerPDAs);
    console.log(players);
    return players
      .map((player, idx) => ({
        publicKey: playerPublicKeys[idx],
        points: player?.points.points ?? 0,
        streak: (dayjs().unix() - (player?.streaks?.lastJoined?.toNumber() ?? 0)) >= 86400 ? 0 : player?.streaks.count ?? 0,
        wins: player?.wins ?? 0,
      }))
      .sort((x, y) => y.points - x.points)
  } catch (error) {
    return [];
  }
}
