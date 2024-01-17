import { GameStatusState } from "@/stores/game"
import { useRecoilValue } from "recoil"

const useGetGameStatus = () => {
  const gameStatus = useRecoilValue(GameStatusState);
  return gameStatus;
}

export default useGetGameStatus;
