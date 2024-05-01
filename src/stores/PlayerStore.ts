import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from "./RootStore";

export class PlayerStore {
  init: boolean = false;
  registered: boolean = false;
  me = {
    lives: 0,
    attacked: '',
    points: 0,
  }

  rootStore: RootStore;
  constructor (rootStore: RootStore) {
    makeAutoObservable(this, {});
    this.rootStore = rootStore;
  }

  setPlayer (player: any) {
    runInAction(() => {
      this.init = true;
      this.registered = player?.registered ?? false;
      this.me = {
        lives: player?.lives ?? 0,
        attacked: '',
        points: player?.points?.points ?? 0,
      }
    })
  }

  resetPlayer () {
    runInAction(() => {
      this.init = false;
      this.registered = false;
      this.me = {
        lives: 0,
        attacked: '',
        points: 0,
      }
    })
  }
}
