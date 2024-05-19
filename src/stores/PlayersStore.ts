import { computed, makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from "./RootStore";

export type Player = {
  lives: number;
  attacked: string;
}

export class PlayersStore {
  init: boolean = false;
  list: Record<string, Player> = {};
  dead: Record<string, string> = {};

  rootStore: RootStore;
  constructor (rootStore: RootStore) {
    makeAutoObservable(this, {
      isWinner: computed,
    });
    this.rootStore = rootStore;
  }

  get isWinner () {
    const survivors: string[] = [];
    console.log('firstShooter:', this.rootStore.gameStore.firstShooter);
    for (const publickKey of Object.keys(this.list)) {
      if (this.list[publickKey].lives) {
        survivors.push(publickKey);
      }
    }
    if (survivors.length === 1) {
      return survivors[0] === (this.rootStore.globalStore.publicKey?.toString() ?? '');
    }
    if (survivors.length === 0 && this.rootStore.gameStore.firstShooter) {
      return this.rootStore.gameStore.firstShooter === (this.rootStore.globalStore.publicKey?.toString() ?? '');
    }
    return false;
  }

  setPlayers (players: Record<string, Player>) {
    console.log('players:', players);
    runInAction(() => {
      this.init = true;
      this.list = players;
    })
  }

  setDeadPlayers (playerUpdate: Record<string, string>) {
    runInAction(() => {
      for (const player of Object.keys(playerUpdate)) {
        this.list[player].lives = 0;
        this.list[player].attacked = playerUpdate[player];
      }
      this.dead = playerUpdate;
    })
  }

  resetPlayers () {
    runInAction(() => {
      this.init = false;
      this.list = {};
      this.dead = {};
    })
  }
}
