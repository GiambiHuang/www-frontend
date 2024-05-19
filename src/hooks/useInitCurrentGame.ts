import { useCallback, useEffect, useRef } from "react";
import { GetGameResult, getGame, getTimestamp } from "@/apis/game";
import { usePageVisibility } from 'react-page-visibility';
import { store } from "@/stores/RootStore";

const useInitCurrentGame = () => {
  const { gameStore } = store;
  const ref = useRef<NodeJS.Timeout | null>(null);
  const isVisible = usePageVisibility();

  const fetchCurrentGame = useCallback(async () => {
    const [
      game,
      currentTime,
    ] = await Promise.all([
      getGame(),
      getTimestamp(),
    ]);
    console.log(currentTime - Date.now());
    gameStore.setTimeDiff(Date.now(), currentTime);
    gameStore.setGame(game as GetGameResult);
    if (game) {
      const { state } = game;
      if (!state.finished) {
        ref.current && clearInterval(ref.current);
        ref.current = setInterval(() => {
          // update current time
          gameStore.updateTime(Date.now());
        }, 500);
      }
    }
  }, []);

  useEffect(() => {
    return () => { ref.current && clearInterval(ref.current); }
  }, []);

  useEffect(() => {
    isVisible && fetchCurrentGame()
  }, [isVisible]);
}

export default useInitCurrentGame;
