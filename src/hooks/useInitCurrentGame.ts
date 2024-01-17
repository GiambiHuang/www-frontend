import { useSetRecoilState } from "recoil";
import { useCallback, useEffect, useRef } from "react";
import { getGame, getTimestamp } from "@/apis/game";
import { usePageVisibility } from 'react-page-visibility';
import { CurrentGameState } from "@/stores/game";

const useInitCurrentGame = () => {
  const setCurrentGame = useSetRecoilState(CurrentGameState);
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
    if (game) {
      const { startTime, config, state, firstShooter, survivors } = game;
      setCurrentGame({
        init: true,
        currentTime,
        joinTime: startTime.toNumber() * 1000,
        startTime: (startTime.toNumber() + config.stakingCooldown) * 1000,
        finished: !!state.finished,
        roundDuration: config.roundDuration.toNumber(),
        roundSettlement: config.roundSettlementDuration.toNumber(),
        entranceFee: config.entranceFee,
        firstShooter: firstShooter,
        survivors: survivors,
      })
      if (!state.finished) {
        ref.current && clearInterval(ref.current);
        ref.current = setInterval(() => {
          // update current time
          getTimestamp().then(currentTime => setCurrentGame(state => ({ ...state, currentTime, started: currentTime >= startTime.toNumber() })))
        }, 1000);
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
