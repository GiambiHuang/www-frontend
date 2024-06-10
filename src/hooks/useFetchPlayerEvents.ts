import { fetchEvents, getMatch, getGame } from "@/apis/game";
import { useCallback, useEffect } from "react";
import { store } from "@/stores/RootStore";

const useFetchPlayerEvents = () => {
  const { gameStore } = store;

  const fetchPlayerEventsOnce = useCallback(async () => {
    if (gameStore.gameConfig.init && !gameStore.finished) {
      // if (gameStore.started) {
        try {
          const match = await getMatch();
          const { signatureUntil, players, dead } = await fetchEvents({ match: match.number, startTime: gameStore.gameConfig.joinTime / 1000 })
          // const { players: currentPlayers, lastGameEndSignature } = await getCurrentPlayers();
          gameStore.setGamePlayers(dead, players, signatureUntil);
        } catch (error) {
          gameStore.setGamePlayers([], []);
        }
    }
  }, [gameStore.gameConfig.joinTime, gameStore.gameConfig.init]);

  const updatePlayerEvents = useCallback(async () => {
    if (gameStore.round.break && gameStore.gamePlayers.init) {
      const match = await getMatch();
      const [playerUpdate, game] = await Promise.all([
        fetchEvents({ match: match.number, startTime: gameStore.gameConfig.joinTime / 1000, until: gameStore.gamePlayers.signature }),
        getGame(),
      ])
      gameStore.setFirstShooter(game?.firstShooter ?? '');
      gameStore.setGamePlayers(playerUpdate.dead, playerUpdate.players, playerUpdate.signatureUntil);
    }
  }, [gameStore.round.break, gameStore.gamePlayers.init])

  useEffect(() => {
    fetchPlayerEventsOnce();
  }, [fetchPlayerEventsOnce]);

  useEffect(() => {
    updatePlayerEvents();
  }, [updatePlayerEvents]);
}

export default useFetchPlayerEvents;
