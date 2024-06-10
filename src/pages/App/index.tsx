import { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Flex, Box, Button, Center } from "@chakra-ui/react";

import Logo from '@/assets/images/logo-main.svg?react';
import { useNavigate } from "react-router-dom";
import backgroundImg from '@/assets/images/background.webp';
import { observer } from 'mobx-react-lite';
import { store } from '@/stores/RootStore';
import useProgram from '@/hooks/useProgram';
import { gameMatchPublicKey } from '@/constants/network';
import { getGamePDA } from '@/utils/www';
import { BN } from '@coral-xyz/anchor';

const AppContainer = styled.div`
  width: 100%;
  padding-top: 12.5rem;
  background: center / cover no-repeat url(${backgroundImg});
  background-color: lightgray;
`;

const App: FC = () => {
  const { globalStore, gameStore } = store;
  const navigate = useNavigate();
  const program = useProgram();
  const ref = useRef<NodeJS.Timeout>();

  const handlePlay = useCallback(() => {
    if (globalStore.connected) {
      navigate('/start');
    } else {
      globalStore.handleConnectModal();
    }
  }, [globalStore.connected]);

  const handleStart = useCallback(async () => {
    ref.current && clearInterval(ref.current);
    const match = await program.account.match.fetch(gameMatchPublicKey);
    const [gameAccount] = getGamePDA(program.programId, match.number + 1, gameMatchPublicKey);
    try {
      await program.methods
        .startGame(new BN(0))
        .accounts({
          gameAccount,
          matchAccount: gameMatchPublicKey,
          player: globalStore.publicKey || undefined,
        })
        .rpc();
    } catch (error) {
      console.log("error:", error);
    } finally {
      gameStore.refresh();
    }
  }, [program]);

  const canJoin = useMemo(() =>
    gameStore.ableToJoin && gameStore.gameConfig.init,
    [gameStore.ableToJoin, gameStore.gameConfig.init]
  );

  const canStart = useMemo(() => {
    return gameStore.finished && globalStore.connected;
  }, [gameStore.finished, globalStore.connected]);

  useEffect(() => {
    ref.current = setInterval(() => {
      gameStore.refresh();
    }, 2000);
    return () => {
      ref.current && clearInterval(ref.current);
    }
  }, []);

  return (
    <AppContainer>
      <Center minH={'calc(100vh - 12.5rem)'} alignItems={'flex-start'}>
        <Flex flex={1} flexDirection={'column'} alignItems={'center'}>
          <Box>
            <Logo />
          </Box>
          <Flex flexDirection="column" maxW="22.5rem" w={'100%'} gap="1.125rem" mt={'-1rem'}>
            <Button variant="primary" width="100%" isDisabled={!canStart} onClick={handleStart}>
              START GAME
            </Button>
            <Button variant="primary" width="100%" isDisabled={!canJoin} onClick={handlePlay}>
              JOIN GAME
            </Button>
            <Button variant="secondary" onClick={() => globalStore.handleRuleModal()}>
              RULES
            </Button>
          </Flex>
        </Flex>
      </Center>
    </AppContainer>
  )
}

export default observer(App);
