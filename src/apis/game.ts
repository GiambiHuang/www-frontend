import { endpoint, gameMatchPublicKey, programId } from "@/constants/network";
import { BorshCoder, EventParser, Program, web3 } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";

import { IDL } from "@/contracts/www";

import * as buffer from "buffer";
import { getGamePDA, getPlayerPDA } from "@/utils/www";
window.Buffer = buffer.Buffer;

const connection = new Connection(endpoint, 'processed')
const anonymousProgram = new Program(IDL, programId, { connection });

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
    return null;
  }
}

export const getTimestamp = async () => {
  const slot = await connection.getSlot();
  const timestamp = await connection.getBlockTime(slot);
  return timestamp ? timestamp * 1000 : Date.now();
}

export const getCurrentPlayers = async () => {
  const connection = new Connection(endpoint, 'confirmed')
  const sign = await connection.getSignaturesForAddress(anonymousProgram.programId);
  const txns = await connection.getTransactions(sign.map(s => s.signature));
  const match = await anonymousProgram.account.match.fetch(gameMatchPublicKey);
  const game = await getGame();

  const eventParser = new EventParser(anonymousProgram.programId, new BorshCoder(anonymousProgram.idl));
  const playerPDAs = [];
  const playerPublicKeys = [];
  for (const txn of txns) {
    const { blockTime, meta } = txn || {} ;
    const events = eventParser.parseLogs(meta?.logMessages ?? []);
    const { value } = events.next();
    if (value?.name === 'JoinEvent' && (game?.startTime.toNumber() ?? 0) < (blockTime || 0)) {
      const publicKey = new web3.PublicKey(value?.data?.player as any);
      playerPublicKeys.push(publicKey);
      playerPDAs.push(getPlayerPDA(anonymousProgram.programId, match.number, publicKey)[0])
    }
  }

  const players = await anonymousProgram.account.player.fetchMultiple(playerPDAs);
  return playerPublicKeys.map((publicKey, idx) => ({
    publicKey,
    lives: players[idx]?.lives,
    attacked: '',
  }))
}

export const getDeadPlayers = async () => {
  const connection = new Connection(endpoint, 'confirmed')
  const sign = await connection.getSignaturesForAddress(anonymousProgram.programId);
  const txns = await connection.getTransactions(sign.map(s => s.signature));
  const game = await getGame();

  const eventParser = new EventParser(anonymousProgram.programId, new BorshCoder(anonymousProgram.idl));
  const deadList: any[] = [];
  for (const txn of txns) {
    const { blockTime, meta } = txn || {} ;
    const events = eventParser.parseLogs(meta?.logMessages ?? []);
    const { value } = events.next();
    if (value?.name === 'AttackEvent' && (game?.startTime.toNumber() || 0) < (blockTime || 0)) {
      const { attacker, target, targetLivesRemaining } = value?.data;
      if (!targetLivesRemaining) {
        deadList.push({
          attacker: (attacker as web3.PublicKey).toString(),
          player: (target as web3.PublicKey).toString(),
        })
      }
    }
  }
  return deadList;
}

export type LeaderboardPlayer = {
  publicKey: string;
  points: number;
}

export const getLeaderboard = async (): Promise<LeaderboardPlayer[]> => {
  try {
    const connection = new Connection(endpoint, 'confirmed')
    const sign = await connection.getSignaturesForAddress(anonymousProgram.programId);
    const txns = await connection.getTransactions(sign.map(s => s.signature));
    const match = await anonymousProgram.account.match.fetch(gameMatchPublicKey);

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
          playerPDAs.push(getPlayerPDA(anonymousProgram.programId, match.number, new web3.PublicKey(publicKey))[0])
        }
      }
    }

    const players = await anonymousProgram.account.player.fetchMultiple(playerPDAs);
    return players
      .map((player, idx) => ({
        publicKey: playerPublicKeys[idx],
        points: player?.points.points ?? 0,
      }))
      .sort((x, y) => y.points - x.points)
  } catch (error) {
    return [];
  }
}
