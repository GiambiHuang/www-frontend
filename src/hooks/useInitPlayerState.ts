import { usePageVisibility } from 'react-page-visibility';

import { useCallback, useEffect } from "react";
import useProgram from "./useProgram";
import { getPlayerPDA } from "@/utils/www";
import { gameMatchPublicKey } from "@/constants/network";
import { store } from "@/stores/RootStore";

const useInitPlayerState = () => {
  const { globalStore, gameStore } = store;
  const program = useProgram();
  const isVisible = usePageVisibility();

  const handleFetchPlayer = useCallback(async () => {
    if (globalStore.publicKey) {
      try {
        const match = await program.account.match.fetch(gameMatchPublicKey);
        const [playerPDA] = getPlayerPDA(
          program.programId,
          match.number,
          globalStore.publicKey,
        );
        try {
          const player = await program.account.player.fetch(playerPDA);
          // playerStore.setPlayer(player);
          gameStore.setMePlayer(true, player.lives, player.attacked.attacker.toString(), player.name);
        } catch (error) {
          gameStore.setMePlayer(false, 0, '', '');
          // playerStore.setPlayer(null);
        }
      } catch (error) {
        console.log(error);
        gameStore.setMePlayer(false, 0, '', '');
        // playerStore.setPlayer(null);
      }
    }
  }, [globalStore.publicKey, isVisible, gameStore.round.break]);

  useEffect(() => {
    handleFetchPlayer();
  }, [handleFetchPlayer]);
}

export default useInitPlayerState;
