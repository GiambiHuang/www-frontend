import { computed, makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./RootStore";
import { BN } from "@coral-xyz/anchor";
import { GetGameResult } from "@/apis/game";

export class GameStore {
  init: boolean = false;
  finished = false;

  entranceFee!: BN;

  currentTime: number = 0;
  startTime: number = 0;
  joinTime: number = 0;

  roundDuration: number = 0;
  roundSettlement: number = 0;

  firstShooter: string = '';

  rootStore: RootStore;
  constructor (rootStore: RootStore) {
    makeAutoObservable(this, {
      started: computed,
      round: computed,
      ableToJoin: computed,
    });
    this.rootStore = rootStore;
  }

  get started () {
    return this.startTime > 0 && this.currentTime >= this.startTime;
  }

  get ableToJoin () {
    return this.joinTime > 0 && !this.finished && this.currentTime >= this.joinTime;
  }

  get round () {
    const timeAfterStart = Math.max(Math.floor((this.currentTime - this.startTime) / 1000), 0);
    const roundNumber = Math.floor(timeAfterStart / Math.max(this.roundDuration + this.roundSettlement, 1));

    const singleRoundDuration = this.roundDuration + this.roundSettlement;
    // remainingActiveTime: for attack.
    const remainingAttackTime = Math.max(this.roundDuration - (timeAfterStart % singleRoundDuration), 0);
    // remainingSettlementTime: for checking dead list.
    const remainingSettlementTime = Math.min(this.roundSettlement, singleRoundDuration - (timeAfterStart % singleRoundDuration));
    return {
      num: roundNumber,
      remainingAttackTime,
      remainingSettlementTime,
      break: remainingAttackTime === 0,
    }
  }

  setFirstShooter (firstShooter: string) {
    runInAction(() => {
      this.firstShooter = firstShooter;
    })
  }

  setGame (game: GetGameResult | null, timestamp: number) {
    runInAction(() => {
      this.init = true;
      this.currentTime = timestamp;
      if (game) {
        this.startTime = (game.startTime.toNumber() + game.config.stakingCooldown) * 1000;
        this.joinTime = game.startTime.toNumber() * 1000;
        this.finished = !!game.state.finished;
  
        this.roundDuration = game.config.roundDuration.toNumber();
        this.roundSettlement = game.config.roundSettlementDuration.toNumber();
  
        this.entranceFee = game.config.entranceFee;
      }

      // this.currentConfig = {
      //   entranceFee: game.config.entranceFee,
      //   firstShooter: game.firstShooter,
      //   survivors: game.survivors,
      // }
    });
  }

  updateTime (timestamp: number) {
    runInAction(() => {
      this.currentTime = timestamp;
    })
  }
}
