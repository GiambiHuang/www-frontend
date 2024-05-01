// import { BN } from "@coral-xyz/anchor";
// import { atom, selector } from "recoil";


// type CurrentGameStateType = {
//   init: boolean;
//   startTime: number;
//   joinTime: number;
//   finished: boolean;
//   currentTime: number;
//   roundDuration: number;
//   roundSettlement: number;
//   entranceFee: BN;
//   firstShooter: string;
//   survivors: number;
// }

// export const CurrentGameState = atom<CurrentGameStateType>({
//   key: 'CurrentGameState',
//   default: {
//     init: false,
//     currentTime: -1,
//     joinTime: -1,
//     startTime: -1,
//     finished: false,
//     roundDuration: 0,
//     roundSettlement: 0,
//     entranceFee: new BN(0),
//     firstShooter: '',
//     survivors: 0,
//   }
// });

// type PlayerStateType = {
//   lives: number;
//   attacked: string;
//   points: number;
//   registered: boolean;
//   init: boolean;
// }

// export const PlayerState = atom<PlayerStateType>({
//   key: 'PlayerState',
//   default: {
//     lives: 0,
//     attacked: '',
//     points: 0,
//     registered: false,
//     init: false,
//   }
// });

// export type Player = {
//   lives: number;
//   attacked: string;
// }
// export type DeadPlayer = {
//   attacker: string;
//   player: string;
// }

// type GamePlayersStateType = {
//   init: boolean;
//   deadList: DeadPlayer[];
//   players: Record<string, Player>;
// }

// export const GamePlayersState = atom<GamePlayersStateType>({
//   key: 'GamePlayersState',
//   default: {
//     init: false,
//     deadList: [],
//     players: {},
//   }
// });

// export const GameStatusState = selector({
//   key: 'GameStatusState',
//   get({ get }) {
//     const currentGame = get(CurrentGameState);
//     const playerState = get(PlayerState);
//     const appWallet = get(AppWalletState);
//     const currentPlayers = get(GamePlayersState);
//     const playerPublicKey = appWallet.publicKey?.toString() ?? '';

//     const currentGameInit = currentGame.init;
//     const ableToJoin = !currentGame.finished && currentGame.currentTime >= currentGame.joinTime;
//     const gameStarted = !currentGame.finished && currentGame.currentTime >= currentGame.startTime;

//     const timeAfterStart = Math.max(Math.floor(Math.floor((currentGame.currentTime - currentGame.startTime) / 1000)), 0);
//     const roundNumber = Math.floor(timeAfterStart / (currentGame.roundDuration + currentGame.roundSettlement));
//     console.log(`time after start: ${timeAfterStart}s, roundNumber: ${roundNumber}`);

//     const singleRoundDuration = currentGame.roundDuration + currentGame.roundSettlement;
//     // remainingActiveTime: for attack.
//     const remainingAttackTime = Math.max(currentGame.roundDuration - (timeAfterStart % singleRoundDuration), 0);
//     // remainingSettlementTime: for checking dead list.
//     const remainingSettlementTime = Math.min(currentGame.roundSettlement, singleRoundDuration - (timeAfterStart % singleRoundDuration));

//     // who is user's attacker.
//     const attacker = currentPlayers.deadList.find(deadPlayer => deadPlayer.player === playerPublicKey)?.attacker ?? '';

//     const currentLives = currentPlayers.players[playerPublicKey]?.lives ?? 0;
//     const totalLives = Object.values(currentPlayers.players).reduce((prev, curr) => curr.lives + prev, 0);
//     const onlyHaveLives = currentLives > 0 && currentLives == totalLives;
//     const firstShooter = totalLives === 0 && currentGame.firstShooter === playerPublicKey;
//     const win = (currentGame.survivors == 1 && playerState.lives > 0) || onlyHaveLives || firstShooter;
//     return {
//       player: {
//         init: playerState.init,
//         registered: playerState.registered,
//         lives: playerState.lives,
//         points: playerState.points,
//         attacker,
//         dead: attacker && currentGame.firstShooter !== playerPublicKey,
//         win,
//       },
//       players: {
//         init: currentPlayers.init,
//         list: currentPlayers.players,
//         dead: currentPlayers.deadList,
//       },
//     }
//   }
// })
