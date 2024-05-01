import { computed, makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from "./RootStore";

export type Player = {
  lives: number;
  attacked: string;
}

export class PlayersStore {
  init: boolean = false;
  list: Record<string, Player> = {};
  dead: any[] = [];

  rootStore: RootStore;
  constructor (rootStore: RootStore) {
    makeAutoObservable(this, {
      winner: computed,
      deadList: computed,
    });
    this.rootStore = rootStore;
  }

  get winner () {
    const survivors: string[] = [];
    console.log('firstShooter:', this.rootStore.gameStore.firstShooter);
    for (const publickKey of Object.keys(this.list)) {
      if (this.list[publickKey].lives) {
        survivors.push(publickKey);
      }
    }
    if (survivors.length === 1) {
      return survivors[0];
    }
    if (survivors.length === 0 && this.rootStore.gameStore.firstShooter) {
      return this.rootStore.gameStore.firstShooter;
    }
    return '';
  }

  get deadList () {
    return this.dead.reduce((prev, curr) => {
      curr[prev.player] = prev;
      return curr;
    }, {} as Record<string, any>);
  }

  setPlayers (players: Record<string, Player>) {
    console.log('players:', players);
    runInAction(() => {
      this.init = true;
      this.list = players;
    })
  }

  setDeadPlayers (deadList: any[]) {
    runInAction(() => {
      const newPlayers = {} as Record<string, Player>;
      console.log('deadList:', deadList);
      Object
        .keys(this.list)
        .forEach(publicKey => {
          newPlayers[publicKey] = { ...this.list[publicKey] }
        })
      for (const deadPlayer of deadList) {
        newPlayers[deadPlayer.player] && (newPlayers[deadPlayer.player].lives = 0);
      }
      this.list = newPlayers;
      this.dead = deadList;
    })
  }

  resetPlayers () {
    runInAction(() => {
      this.init = false;
      this.list = {};
      this.dead = [];
    })
  }
}
