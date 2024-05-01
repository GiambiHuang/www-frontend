import { GameStore } from "./GameStore";
import { GlobalStore } from "./GlobalStore";
import { PlayerStore } from "./PlayerStore";
import { PlayersStore } from "./PlayersStore";

export class RootStore {
  globalStore: GlobalStore;
  gameStore: GameStore;
  playerStore: PlayerStore;
  playersStore: PlayersStore;
  // public dcoStore: DcoStore;
  // public modalStore: ModalStore

  constructor() {
    this.globalStore = new GlobalStore(this);
    this.gameStore = new GameStore(this);
    this.playerStore = new PlayerStore(this);
    this.playersStore = new PlayersStore(this);
  }

  reset () {
    this.gameStore = new GameStore(this);
    this.playerStore = new PlayerStore(this);
    this.playersStore = new PlayersStore(this);
  }
}

export const store = new RootStore();
