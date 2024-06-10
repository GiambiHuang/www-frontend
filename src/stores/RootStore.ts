import { GameStore } from "./GameStore";
import { GlobalStore } from "./GlobalStore";

export class RootStore {
  globalStore: GlobalStore;
  gameStore: GameStore;

  constructor() {
    this.globalStore = new GlobalStore(this);
    this.gameStore = new GameStore(this);
  }

  reset () {
    this.gameStore = new GameStore(this);
  }
}

export const store = new RootStore();
