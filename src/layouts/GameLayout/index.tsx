import { Outlet } from "react-router-dom";
import Leaderboard from "@/modals/Leaderboard";
import { Center, Flex } from "@chakra-ui/react";
import LeaderboardButton from "@/containers/LeaderboardButton";
import useLeaderboardModal from "@/hooks/useLeaderboardModal";

const GameLayout: React.FC = () => {
  const { openModal } = useLeaderboardModal();
  return (
    <Center h={'100vh'} position={'relative'} w={'100vw'}>
      <Flex w={'100%'} position={'absolute'} top={0}>
        <Center ml={'auto'} pt={'1.875rem'} pr={'1.25rem'} onClick={openModal}>
          <LeaderboardButton />
        </Center>
      </Flex>
      <Outlet />
      <Leaderboard />
    </Center>
  );
};

export default GameLayout;
