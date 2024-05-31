import { Outlet } from "react-router-dom";
import Leaderboard from "@/modals/Leaderboard";
import { Center, Flex } from "@chakra-ui/react";
import LeaderboardButton from "@/containers/LeaderboardButton";
import { observer } from "mobx-react-lite";
import { store } from "@/stores/RootStore";

const GameLayout: React.FC = () => {
  return (
    <Center h={'100vh'} position={'relative'} w={'100vw'}>
      <Flex w={'100%'} position={'absolute'} top={0}>
        <Center ml={'auto'} pt={'1.875rem'} pr={'1.25rem'} onClick={() => store.globalStore.handleLeaderboardModal()}>
          <LeaderboardButton />
        </Center>
      </Flex>
      <Outlet />
      <Leaderboard />
    </Center>
  );
};

export default observer(GameLayout);
