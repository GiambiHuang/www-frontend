import { FC, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Flex, Box, Button, Center } from "@chakra-ui/react";

import useRuleModal from "@/hooks/useRuleModal";
import Logo from '@/assets/images/logo-main.svg?react';
import { useNavigate } from "react-router-dom";
import backgroundImg from '@/assets/images/background.webp';
import { AppWalletState } from '@/stores/global';
import { useRecoilValue } from 'recoil';
import useConnectModal from '@/hooks/useConnectModal';
import useGetGameStatus from '@/hooks/useGetGameStatus';

const AppContainer = styled.div`
  width: 100%;
  padding-top: 12.5rem;
  background: center / cover no-repeat url(${backgroundImg});
  background-color: lightgray;
`;

const App: FC = () => {
  const { openModal: openRuleModal } = useRuleModal();
  const { openModal: openConnectModal } = useConnectModal();
  const navigate = useNavigate();
  const gameStatus = useGetGameStatus();

  const appWallet = useRecoilValue(AppWalletState);

  const handlePlay = useCallback(() => {
    if (appWallet.connected) {
      navigate('/start');
    } else {
      openConnectModal();
    }
  }, [appWallet.connected]);

  const canJoin = useMemo(() =>
    gameStatus.game.ableToJoin && gameStatus.game.init,
    [gameStatus.game]
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

export default App
