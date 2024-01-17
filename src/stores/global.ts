import { PublicKey } from "@solana/web3.js";
import { atom } from "recoil";

type AppWalletStateType = {
  publicKey: PublicKey | null;
  twitter: string;
  connected: boolean;
}

export const AppWalletState = atom<AppWalletStateType>({
  key: 'AppWalletState',
  default: {
    publicKey: null,
    twitter: '',
    connected: false,
  }
});
