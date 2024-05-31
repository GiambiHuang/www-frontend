import { FC, useCallback, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Flex, Box, Button, Center } from "@chakra-ui/react";

import Logo from '@/assets/images/logo-main.svg?react';
import { useNavigate } from "react-router-dom";
import backgroundImg from '@/assets/images/background.webp';
import { observer } from 'mobx-react-lite';
import { store } from '@/stores/RootStore';
import { useConnection } from '@solana/wallet-adapter-react';

const AppContainer = styled.div`
  width: 100%;
  padding-top: 12.5rem;
  background: center / cover no-repeat url(${backgroundImg});
  background-color: lightgray;
`;

const App: FC = () => {
  const { connection } = useConnection();
  const { globalStore, gameStore } = store;
  const navigate = useNavigate();

  const handlePlay = useCallback(() => {
    if (globalStore.connected) {
      navigate('/start');
    } else {
      globalStore.handleConnectModal();
    }
  }, [globalStore.connected]);

  const canJoin = useMemo(() =>
    gameStore.ableToJoin && gameStore.init,
    [gameStore.ableToJoin, gameStore.init]
  );

  useEffect(() => {
    if (globalStore.publicKey) {
      connection.getBalance(globalStore.publicKey).then(console.log)
    }
  }, [globalStore.publicKey]);

  return (
    <AppContainer>
      <Center minH={'calc(100vh - 12.5rem)'} alignItems={'flex-start'}>
        <Flex flex={1} flexDirection={'column'} alignItems={'center'}>
          <Box>
            <Logo />
          </Box>
          <Flex flexDirection="column" maxW="22.5rem" w={'100%'} gap="1.125rem" mt={'-1rem'}>
            <Button variant="primary" width="100%" isDisabled={!canJoin} onClick={handlePlay}>
              PLAY
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
