import { Outlet } from "react-router-dom";

import ConnectWallet from "@/modals/ConnectWallet";
import Rule from "@/modals/Rule";
import Leaderboard from "@/modals/Leaderboard";
import { Box, Center, Flex } from "@chakra-ui/react";
import LeaderboardButton from "@/containers/LeaderboardButton";
import GameCounter from "@/components/GameCounter";
import ConnectWalletButton from "@/containers/ConnectWalletButton";
import { observer } from "mobx-react-lite";
import { store } from "@/stores/RootStore";

const MainLayout: React.FC = () => {
  const { gameStore, globalStore } = store;

  return (
    <Center h={'100vh'} position={'relative'} w={'100vw'}>
      <Flex w={'100%'} position={'absolute'} top={0}>
        <Center flex={1} pt={'1rem'} onClick={() => globalStore.handleLeaderboardModal()}>
          <LeaderboardButton />
        </Center>
        <Box textAlign="center" padding="1rem 2rem 0.5rem" bg="rgba(0, 0, 0, 13%)" borderBottomRadius="1rem">
          {gameStore.finished ? (
              <GameCounter
                isOver
                now={gameStore.currentTime}
                startFrom={gameStore.startTime}
              />
          ) : (
            gameStore.started ? (
              <GameCounter
                isOver={!gameStore.ableToJoin}
                now={gameStore.startTime}
                startFrom={gameStore.currentTime}
                starting
              />
              ) : (
              <GameCounter
                isOver={!gameStore.ableToJoin}
                now={gameStore.currentTime}
                startFrom={gameStore.startTime}
              />
            )
          )}
        </Box>
        <Flex flex={1} justifyContent={'flex-end'} alignItems={'flex-end'}>
          <Box mb={'1.375rem'} mx={{ base: '1rem', lg: '2.625rem' }}>
            <ConnectWalletButton />
          </Box>
        </Flex>
      </Flex>
      <Outlet />
      <ConnectWallet />
      <Rule />
      <Leaderboard />
    </Center>
  );
};

export default observer(MainLayout);
