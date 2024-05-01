import { usePageVisibility } from 'react-page-visibility';

import { useCallback, useEffect } from "react";
import useProgram from "./useProgram";
import { getPlayerPDA } from "@/utils/www";
import { gameMatchPublicKey } from "@/constants/network";
import { store } from "@/stores/RootStore";

const useInitPlayerState = () => {
  const { globalStore, playerStore, gameStore } = store;
  const program = useProgram();
  const isVisible = usePageVisibility();

  const handleFetchPlayer = useCallback(async () => {
    if (globalStore.publicKey && !gameStore.finished && (isVisible || gameStore.round.break)) {
      try {
        const match = await program.account.match.fetch(gameMatchPublicKey);
        const [playerPDA] = getPlayerPDA(
          program.programId,
          match.number,
          globalStore.publicKey,
        );
        try {
          const player = await program.account.player.fetch(playerPDA);
          playerStore.setPlayer(player);
        } catch (error) {
          playerStore.setPlayer(null);
        }
      } catch (error) {
        console.log(error);
        playerStore.setPlayer(null);
        // resetPlayerState();
      }
    }
  }, [globalStore.publicKey, isVisible, gameStore.finished, gameStore.round.break]);

  useEffect(() => {
    handleFetchPlayer();
  }, [handleFetchPlayer]);
}

export default useInitPlayerState;
