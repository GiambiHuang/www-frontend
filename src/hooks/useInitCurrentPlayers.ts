import { getCurrentPlayers, getDeadPlayers, getGame } from "@/apis/game";
import { useCallback, useEffect } from "react";
import { store } from "@/stores/RootStore";
import { Player } from "@/stores/PlayersStore";

const useInitCurrentPlayers = () => {
  const { playersStore, gameStore } = store;
  const fetchCurrentPlayers = useCallback(async () => {
    if (gameStore.init) {
      // if (gameStore.started) {
        try {
          const currentPlayers = await getCurrentPlayers();
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
  }, [gameStore.started, gameStore.init]);

  const fetchDeadPlayers = useCallback(async () => {
    if (gameStore.round.break && playersStore.init) {
      const [deadList, game] = await Promise.all([
        getDeadPlayers(),
        getGame(),
      ])
      console.log(deadList, game?.firstShooter)
      gameStore.setFirstShooter(game?.firstShooter ?? '');
      playersStore.setDeadPlayers(deadList);
    }
  }, [gameStore.round.break, playersStore.init])

  useEffect(() => {
    fetchCurrentPlayers();
  }, [fetchCurrentPlayers]);

  useEffect(() => {
    fetchDeadPlayers();
  }, [fetchDeadPlayers]);
}

export default useInitCurrentPlayers;
