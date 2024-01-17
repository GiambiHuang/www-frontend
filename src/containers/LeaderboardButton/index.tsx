import { Box, Image } from "@chakra-ui/react";
import { FC } from "react";

import Leaderboard from '@/assets/images/leaderboard.webp';
import useLeaderboardModal from "@/hooks/useLeaderboardModal";

const LeaderboardButton: FC = () => {
  const { openModal } = useLeaderboardModal();
  return (
    <Box
      boxSize={{ base: '8rem', lg: '11.25rem' }}
      cursor={'pointer'}
      opacity={0.8}
      dropShadow={'0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.25)'}
      _hover={{
        opacity: 1
      }}
      onClick={openModal}
    >
      <Image src={Leaderboard} />
    </Box>
  );
}

export default LeaderboardButton;
