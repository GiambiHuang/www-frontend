import { FC, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Flex, Box, Button, Center } from "@chakra-ui/react";

import useRuleModal from "@/hooks/useRuleModal";
import Logo from '@/assets/images/logo-main.svg?react';
import { useNavigate } from "react-router-dom";
import backgroundImg from '@/assets/images/background.webp';
import useConnectModal from '@/hooks/useConnectModal';
import { observer } from 'mobx-react-lite';
import { store } from '@/stores/RootStore';

const AppContainer = styled.div`
  width: 100%;
  padding-top: 12.5rem;
  background: center / cover no-repeat url(${backgroundImg});
  background-color: lightgray;
`;

const App: FC = () => {
  const { globalStore, gameStore } = store;
  const { openModal: openRuleModal } = useRuleModal();
  const { openModal: openConnectModal } = useConnectModal();
  const navigate = useNavigate();

  const handlePlay = useCallback(() => {
    if (globalStore.connected) {
      navigate('/start');
    } else {
      openConnectModal();
    }
  }, [globalStore.connected]);

  const canJoin = useMemo(() =>
    gameStore.ableToJoin && gameStore.init,
    [gameStore.ableToJoin, gameStore.init]
  );

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
            <Button variant="secondary" onClick={openRuleModal}>
              RULES
            </Button>
          </Flex>
        </Flex>
      </Center>
    </AppContainer>
  )
}

export default observer(App);
