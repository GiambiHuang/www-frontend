import { ConnectWalletState } from "@/stores/modal";
import { useSetRecoilState } from "recoil";

type useConnectModalType = {
  openModal: () => void;
  closeModal: () => void;
}

const useConnectModal = (): useConnectModalType => {
  const setConnectWalletState = useSetRecoilState(ConnectWalletState);

  return {
    openModal: () => setConnectWalletState({ open: true }),
    closeModal: () => setConnectWalletState({ open: false }),
  };
}

export default useConnectModal;
