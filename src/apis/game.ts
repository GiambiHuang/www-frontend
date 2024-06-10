import { endpoint, gameMatchPublicKey, programId } from "@/constants/network";
import { BN, BorshCoder, EventParser, Program, web3 } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";

import { IDL } from "@/contracts/www";

import * as buffer from "buffer";
import { getGamePDA, getPlayerPDA, getPlayerStatsAccount } from "@/utils/www";

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

export const getMatch = () => {
  return anonymousProgram.account.match.fetch(gameMatchPublicKey);;
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

export const fetchEvents = async ({ match, startTime = 0, until }: { match: number, startTime?: number, until?: string }) => {
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

  const eventParser = new EventParser(anonymousProgram.programId, new BorshCoder(anonymousProgram.idl));
  const dead: Record<string, string>[] = [];
  const playerPDAs = [];
  const publickeys: web3.PublicKey[] = [];
  let signatureUntil = until ?? '';
  for (const txn of txns) {
    const { blockTime, meta } = txn || {} ;
    const events = eventParser.parseLogs(meta?.logMessages ?? []);
    const { value } = events.next();
    if (startTime > (blockTime ?? 0)) {
      signatureUntil = txn?.transaction.signatures[0] ?? '';
      break;
    };
    switch (value?.name) {
      case 'AttackEvent':
        const { attacker, target, targetLivesRemaining } = value?.data;
        if (!targetLivesRemaining) {
          dead.push({
            player: target?.toString() ?? '',
            attacker: attacker?.toString() ?? '',
          })
        }
        break;
      case 'JoinEvent':
        const { player } = value?.data;
        const publicKey = new web3.PublicKey(player as any);
        publickeys.push(publicKey);
        playerPDAs.push(
          getPlayerPDA(anonymousProgram.programId, match, publicKey)[0]
        )
        break;
      // case 'EndEvent':
        // if (value?.name === 'EndEvent') {
        //   lastGameEndSignature = txn?.transaction.signatures[0] ?? '';
        //   break;
        // }
        // break;
    }
  }
  const playerData = await anonymousProgram.account.player.fetchMultiple(playerPDAs);
  const players = publickeys.map((publicKey, idx) => ({
    publicKey: publicKey.toString(),
    lives: playerData[idx]?.lives,
    name: playerData[idx]?.name,
    attacked: playerData[idx]?.attacked.attacker.toString() ?? '',
  }));
  return {
    signatureUntil,
    players,
    dead,
  }
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
    return players
      .map((player, idx) => ({
        publicKey: playerPublicKeys[idx],
        points: player?.points.points ?? 0,
        streak: player?.streaks.count ?? 0,
        wins: player?.wins ?? 0,
      }))
      .sort((x, y) => y.points - x.points)
  } catch (error) {
    return [];
  }
}
