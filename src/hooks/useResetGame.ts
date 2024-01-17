import { GamePlayersState, CurrentGameState, PlayerState } from "@/stores/game";
import { useCallback } from "react";
import { useResetRecoilState } from "recoil";

const useResetGame = () => {
  const resetCurrentGame = useResetRecoilState(CurrentGameState);
  const resetPlayerState = useResetRecoilState(PlayerState);
  const resetGamePlayersState = useResetRecoilState(GamePlayersState);
  const handleReset = useCallback(() => {
    resetCurrentGame();
    resetPlayerState();
    resetGamePlayersState();
  }, []);

  return handleReset;
}

export default useResetGame;
