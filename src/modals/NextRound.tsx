import AppModal from "@/components/AppModal";
import { Text, Center, chakra } from "@chakra-ui/react";
import { FC } from "react";

import DeadList from "@/components/DeadList";
import useGetGameStatus from "@/hooks/useGetGameStatus";

const NextRound: FC = () => {
  const gameStatus = useGetGameStatus();
  return (
    <AppModal open motionPreset="none">
      <Center
        w={'100vw'}
        h={'100vh'}
        gap={'6.25rem'}
        bgColor={'rgba(68, 68, 68, 0.9)'}
      >
        <DeadList list={gameStatus.players.dead} />
        <Center fontFamily="Potta One" flexDirection={'column'}>
          <Text color="button.border" fontSize={'2.5rem'} lineHeight={1.45}>NEXT ROUND STARTS IN</Text>
          <chakra.svg flex={1} textShadow={'0 0.25rem 0.25rem rgba(0, 0, 0, 0.25)'} width="200px" fontSize={'10rem'} height="200px" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" strokeWidth="2rem" paintOrder="stroke" stroke="#9ED9E3">
              {gameStatus.round.remainingSettlementTime}
            </text>
          </chakra.svg>
        </Center>
      </Center>
    </AppModal>
  );
}

export default NextRound;
