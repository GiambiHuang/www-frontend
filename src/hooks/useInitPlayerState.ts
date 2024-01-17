import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { usePageVisibility } from 'react-page-visibility';

import { PlayerState } from "@/stores/game";
import { useCallback, useEffect } from "react";
import { AppWalletState } from "@/stores/global";
import useProgram from "./useProgram";
import { getPlayerPDA } from "@/utils/www";
import { gameMatchPublicKey } from "@/constants/network";
import useGetGameStatus from "./useGetGameStatus";

const useInitPlayerState = () => {
  const appWallet = useRecoilValue(AppWalletState);
  const setPlayerState = useSetRecoilState(PlayerState);
  const resetPlayerState = useResetRecoilState(PlayerState);
  const gameStatus = useGetGameStatus();
  const program = useProgram();
  const isVisible = usePageVisibility();

  const handleFetchPlayer = useCallback(async () => {
    if (appWallet.publicKey && !gameStatus.game.finished && (isVisible || gameStatus.round.break)) {
      try {
        const match = await program.account.match.fetch(gameMatchPublicKey);
        const [playerPDA] = getPlayerPDA(
          program.programId,
          match.number,
          appWallet.publicKey,
        );
        try {
          const player = await program.account.player.fetch(playerPDA);
          setPlayerState({
            lives: player.lives,
            attacked: '',
            points: player.points.points,
            registered: player.registered,
            init: true,
          })
        } catch (error) {
          setPlayerState({
            lives: 0,
            attacked: '',
            points: 0,
            registered: false,
            init: true,
          })
        }
      } catch (error) {
        console.log(error);
        resetPlayerState();
      }
    }
  }, [appWallet.publicKey, isVisible, gameStatus.game.finished, gameStatus.round.break]);

  useEffect(() => {
    handleFetchPlayer();
  }, [handleFetchPlayer]);
}

export default useInitPlayerState;

