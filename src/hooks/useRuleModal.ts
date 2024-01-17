import { RuleState } from "@/stores/modal";
import { useSetRecoilState } from "recoil";

type useRuleModalType = {
  openModal: () => void;
  closeModal: () => void;
}

const useRuleModal = (): useRuleModalType => {
  const setRuleState = useSetRecoilState(RuleState);

  return {
    openModal: () => setRuleState({ open: true }),
    closeModal: () => setRuleState({ open: false }),
  };
}

export default useRuleModal;
