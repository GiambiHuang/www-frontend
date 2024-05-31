import { makeAutoObservable, runInAction } from 'mobx';
import { PublicKey } from "@solana/web3.js";
import { RootStore } from "./RootStore";

export class GlobalStore {
  publicKey: PublicKey | null = null;
  twitter: string = '';
  connected: boolean = false;

  connectModal = false;
  ruleModal = false;
  leaderboardModal = false;

  rootStore: RootStore;
  constructor (rootStore: RootStore) {
    makeAutoObservable(this, {});
    this.rootStore = rootStore;
  }

  setWallet (publicKey: PublicKey | null, connected: boolean) {
    runInAction(() => {
      this.publicKey = publicKey;
      this.connected = connected;

    })
  }

  handleConnectModal (open: boolean = true) {
    runInAction(() => {
      this.connectModal = open;
    })
  }

  handleRuleModal (open: boolean = true) {
    runInAction(() => {
      this.ruleModal = open;
    })
  }

  handleLeaderboardModal (open: boolean = true) {
    runInAction(() => {
      this.leaderboardModal = open;
    })
  }
}
