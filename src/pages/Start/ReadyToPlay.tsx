import { Box, Flex, chakra, Text, Center } from "@chakra-ui/react";
import { FC, useEffect, useMemo } from "react";
import backgroundImg from '@/assets/images/background-start.webp';
import AppModal from "@/components/AppModal";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { store } from "@/stores/RootStore";
dayjs.extend(duration);

const ReadyToPlay: FC = () => {
  const { gameStore } = store;
  const navigate = useNavigate();

  const countdown = useMemo(() => {
    return Math.max(dayjs.duration(gameStore.gameConfig.startTime - gameStore.currentTime).asSeconds(), 0);
  }, [gameStore.currentTime]);

  useEffect(() => {
    if (gameStore.started) {
      navigate('/game');
    }
  }, [gameStore.started]);

  return (
    <Flex flex={1} mt={'8.5rem'} flexDirection={'column'} alignItems={'center'}>
      <Box fontFamily={'Potta One'}>
        <chakra.svg width="756" fontSize={'5rem'} height="116" viewBox="-20 0 806 116" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#9ED9E3" strokeWidth="1rem" paintOrder="stroke" stroke="#2F6B75">
            ARE YOU READY?
          </text>
        </chakra.svg>
      </Box>
      <Box textAlign={'center'} fontSize={'1.5rem'} lineHeight={'1.75rem'}>
        <Text>You've chosen {gameStore.mePlayer.lives} wagers to participate in this game.</Text>
        <Text>Please wait patiently, the game will start soon!</Text>
      </Box>
      <AppModal open={countdown <= 30} motionPreset="none">
        <Center flexDirection={'column'} fontFamily={'Potta One'} w={'100vw'} h={'100vh'} bgImage={backgroundImg} bgSize={'cover'} bgRepeat={'no-repeat'} bgPos={'top center'}>
          <Text fontSize={'2.5rem'} lineHeight={1} color={'button.bg'}>GAME STARTS IN</Text>
          <chakra.svg textShadow={'0 0.25rem 0.25rem rgba(0, 0, 0, 0.25)'} width="240px" fontSize={'10rem'} height="220px" viewBox="0 0 200 221" xmlns="http://www.w3.org/2000/svg">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" strokeWidth="2rem" paintOrder="stroke" stroke="#2F6B75">
              {countdown.toFixed(0)}
            </text>
          </chakra.svg>
        </Center>
      </AppModal>
    </Flex>
  );
}

export default observer(ReadyToPlay);
