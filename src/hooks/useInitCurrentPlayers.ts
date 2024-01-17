import { getCurrentPlayers, getDeadPlayers } from "@/apis/game";
import { GamePlayersState, Player } from "@/stores/game";
import { useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import useGetGameStatus from "./useGetGameStatus";

const useInitCurrentPlayers = () => {
  const gameStatus = useGetGameStatus();
  const setGamePlayersState = useSetRecoilState(GamePlayersState)

  const fetchCurrentPlayers = useCallback(async () => {
    if (gameStatus.game.started) {
      const currentPlayers = await getCurrentPlayers();
      const players = {} as Record<string, Player>;
      for (const player of currentPlayers) {
        players[player.publicKey.toString()] = {
          lives: player.lives || 0,
          attacked: player.attacked,
        }
      }
      setGamePlayersState(state => {
        return {
          init: true,
          players,
          deadList: state.deadList.map(dead => ({ ...dead })),
        }
      })
    }
  }, [gameStatus.game.started]);

  const fetchDeadPlayers = useCallback(async () => {
    if (gameStatus.round.break && gameStatus.players.init) {
      const deadList = await getDeadPlayers();
      setGamePlayersState(state => {
        const newPlayers = {} as Record<string, Player>;
        Object
          .keys(state.players)
          .forEach(publicKey => {
            newPlayers[publicKey] = { ...state.players[publicKey] }
          })
        for (const deadPlayer of deadList) {
          newPlayers[deadPlayer.player] && (newPlayers[deadPlayer.player].lives = 0)
        }
        return {
          init: state.init,
          players: newPlayers,
          deadList,
        }
      })
    }
  }, [gameStatus.round.break, gameStatus.players.init])

  useEffect(() => {
    fetchCurrentPlayers();
  }, [fetchCurrentPlayers]);

  useEffect(() => {
    fetchDeadPlayers();
  }, [fetchDeadPlayers]);
}

export default useInitCurrentPlayers;
