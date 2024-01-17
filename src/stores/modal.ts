import { atom } from "recoil";

type ConnectWalletStateType = {
  open: boolean
}

export const ConnectWalletState = atom<ConnectWalletStateType>({
  key: 'ConnectWalletState',
  default: {
    open: false,
  }
});

export const RuleState = atom<ConnectWalletStateType>({
  key: 'RuleState',
  default: {
    open: false,
  }
});

export const LeaderboardState = atom<ConnectWalletStateType>({
  key: 'LeaderboardState',
  default: {
    open: false,
  }
});
