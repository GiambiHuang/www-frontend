import { getCurrentPlayers, getAttackEvents, getGame } from "@/apis/game";
import { useCallback, useEffect } from "react";
import { store } from "@/stores/RootStore";
import { Player } from "@/stores/PlayersStore";

const useInitCurrentPlayers = () => {
  const { playersStore, gameStore } = store;
  const fetchCurrentPlayers = useCallback(async () => {
    if (gameStore.init) {
      // if (gameStore.started) {
        try {
          const { players: currentPlayers, lastGameEndSignature } = await getCurrentPlayers();
          gameStore.setSignature(lastGameEndSignature);
          const players = {} as Record<string, Player>;
          for (const player of currentPlayers) {
            players[player.publicKey.toString()] = {
              lives: player.lives || 0,
              attacked: player.attacked,
            }
          }
          playersStore.setPlayers(players)
        } catch (error) {
          playersStore.setPlayers({});
        }
      // } else {
      //   playersStore.setPlayers({});
      // }
    }
  }, [gameStore.started, gameStore.init, gameStore.ready]);

  const fetchDeadPlayers = useCallback(async () => {
    if (gameStore.round.break && playersStore.init && gameStore.gameStartSignature) {
      const [playerUpdate, game] = await Promise.all([
        getAttackEvents(gameStore.gameStartSignature),
        getGame(),
      ])
      gameStore.setFirstShooter(game?.firstShooter ?? '');
      playersStore.setDeadPlayers(playerUpdate);
    }
  }, [gameStore.round.break, playersStore.init, gameStore.gameStartSignature])

  useEffect(() => {
    fetchCurrentPlayers();
  }, [fetchCurrentPlayers]);

  useEffect(() => {
    fetchDeadPlayers();
  }, [fetchDeadPlayers]);
}

export default useInitCurrentPlayers;
