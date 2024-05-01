import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { Center } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

import backgroundImg from '@/assets/images/background-start.webp';
import SelectAmount from './SelectAmount';
import ReadyToPlay from './ReadyToPlay';
import PendingScreen from '@/modals/PendingScreen';
import { store } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const AppContainer = styled.div`
  width: 100%;
  padding-top: 12.5rem;
  background: top center / cover no-repeat url(${backgroundImg});
  background-color: lightgray;
`;

const Start: FC = () => {
  const { gameStore, playerStore } = store;
  const navigate = useNavigate();

  const renderContent = () => {
    if (gameStore.init && playerStore.init) {
      return playerStore.registered ? <ReadyToPlay /> : <SelectAmount />;
    }
    return <PendingScreen />;
  }

  useEffect(() => {
    if (!gameStore.ableToJoin) {
      navigate('/');
    }
  }, [gameStore.ableToJoin]);

  return (
    <AppContainer>
      <Center minH={'calc(100vh - 12.5rem)'} alignItems={'flex-start'}>
        {renderContent()}
      </Center>
    </AppContainer>
  )
}

export default observer(Start);
