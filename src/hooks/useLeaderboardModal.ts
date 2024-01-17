import { LeaderboardState } from "@/stores/modal";
import { useSetRecoilState } from "recoil";

type useLeaderboardModalType = {
  openModal: () => void;
  closeModal: () => void;
}

const useLeaderboardModal = (): useLeaderboardModalType => {
  const setRuleState = useSetRecoilState(LeaderboardState);

  return {
    openModal: () => setRuleState({ open: true }),
    closeModal: () => setRuleState({ open: false }),
  };
}

export default useLeaderboardModal;
