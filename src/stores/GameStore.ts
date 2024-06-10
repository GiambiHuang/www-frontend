import { computed, makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./RootStore";
import { BN } from "@coral-xyz/anchor";
import { GetGameResult, getGame } from "@/apis/game";

export class GameStore {
  state: GetGameResult['state'] = {};
  currentTime: number = 0;
  firstShooter: string = '';

  gameStartSignature: string = '';
  gameConfig = {
    init: false,
    entranceFee: new BN(0),
    startTime: 0,
    joinTime: 0,
    roundDuration: 0,
    roundSettlement: 0,
  }

  timeDiff = {
    browserTime: 0,
    sysTime: 0,
  }

  mePlayer = {
    init: false,
    joined: false,
    name: '',
    lives: 0,
    attacked: '',
  }

  gamePlayers = {
    init: false,
    signature: '',
    dead: [] as any[],
    players: [] as any[],
  }

  rootStore: RootStore;
  constructor (rootStore: RootStore) {
    makeAutoObservable(this, {
      finished: computed,
      started: computed,
      round: computed,
      ready: computed,
      ableToJoin: computed,
      isWinner: computed,
      isDead: computed,
    });
    this.rootStore = rootStore;
  }

  get finished () {
    return !Boolean(this.state.live);
  }

  get started () {
    return this.gameConfig.startTime > 0 && this.currentTime >= this.gameConfig.startTime;
  }

  get ready () {
    const timeAfterStart = Math.floor((this.currentTime - this.gameConfig.startTime) / 1000);
    return this.gameConfig.startTime > 0 && timeAfterStart >= -25;
  }

  get ableToJoin () {
    if (this.mePlayer.init && !this.finished) {
      if (this.started) {
        return this.mePlayer.joined;
      } else {
        return this.gameConfig.joinTime > 0 && this.currentTime >= this.gameConfig.joinTime;;
      }
    }
    return false;
  }

  get round () {
    const timeAfterStart = Math.max(Math.floor((this.currentTime - this.gameConfig.startTime) / 1000), 0);
    const singleRoundDuration = this.gameConfig.roundDuration;
    const roundNumber = Math.floor(timeAfterStart / Math.max(singleRoundDuration, 1));

    const activeTime = this.gameConfig.roundDuration - this.gameConfig.roundSettlement;
    // remainingActiveTime: for attack.
    const remainingAttackTime = Math.max(activeTime - (timeAfterStart % singleRoundDuration), 0);
    // remainingSettlementTime: for checking dead list.
    const remainingSettlementTime = Math.min(this.gameConfig.roundSettlement, singleRoundDuration - (timeAfterStart % singleRoundDuration));
    return {
      num: roundNumber,
      remainingAttackTime,
      remainingSettlementTime,
      break: remainingAttackTime === 0,
    }
  }

  get isWinner () {
    const survivors: string[] = [];
    console.log('firstShooter:', this.firstShooter);
    for (const player of this.gamePlayers.players) {
      if (player.lives) {
        survivors.push(player.publicKey);
      }
    }
    if (survivors.length === 1) {
      return survivors[0] === (this.rootStore.globalStore.publicKey?.toString() ?? '');
    }
    if (survivors.length === 0 && this.firstShooter) {
      return this.firstShooter === (this.rootStore.globalStore.publicKey?.toString() ?? '');
    }
    return false;
  }

  get isDead () {
    const deadInfo = this.gamePlayers.dead.find(dead => dead.player === (this.rootStore.globalStore.publicKey?.toString() ?? ''))
    return {
      dead: this.gamePlayers.init ? Boolean(deadInfo) : false,
      attacker: deadInfo?.attacker ?? '',
    }
  }

  setFirstShooter (firstShooter: string) {
    runInAction(() => {
      this.firstShooter = firstShooter;
    })
  }

  setSignature (signature: string) {
    runInAction(() => {
      this.gameStartSignature = signature;
    })
  }

  setTimeDiff (browserTime: number, sysTime: number) {
    runInAction(() => {
      this.timeDiff = {
        browserTime,
        sysTime,
      }
    })
  }

  setGame (game: GetGameResult | null) {
    runInAction(() => {
      this.gameConfig = {
        init: true,
        startTime: game ? (game.startTime.toNumber() + game.config.stakingCooldown) * 1000 : 0,
        joinTime: game ? game.startTime.toNumber() * 1000 : 0,
        roundDuration: game ? game.config.roundDuration.toNumber() : 0,
        roundSettlement: game ? game.config.roundSettlementDuration.toNumber() : 0,
        entranceFee: game ? game.config.entranceFee : new BN(0),
      }
      this.state = game?.state ?? {};
      this.firstShooter = game?.firstShooter ?? '';
    });
  }

  updateTime (timestamp: number) {
    runInAction(() => {
      this.currentTime = timestamp + (this.timeDiff.sysTime - this.timeDiff.browserTime);
    })
  }

  async refresh () {
    const game = await getGame();
    if (this.state && JSON.stringify(game?.state) !== JSON.stringify(this.state)) {
      this.gameConfig.init = false;
    }
  }

  setMePlayer (joined: boolean, lives: number, attacked: string, name: string) {
    runInAction(() => {
      this.mePlayer = {
        init: true,
        name,
        joined,
        lives,
        attacked,
      }
    })
  }

  setGamePlayers (dead: any[], players: any[], signature: string = '') {
    runInAction(() => {
      this.gamePlayers = {
        init: true,
        signature: signature ?? this.gamePlayers.signature ,
        dead,
        players,
      }
    })
  }
}
