import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { Center } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

import backgroundImg from '@/assets/images/background-start.webp';
import SelectAmount from './SelectAmount';
import ReadyToPlay from './ReadyToPlay';
import useGetGameStatus from '@/hooks/useGetGameStatus';
import PendingScreen from '@/modals/PendingScreen';

const AppContainer = styled.div`
  width: 100%;
  padding-top: 12.5rem;
  background: top center / cover no-repeat url(${backgroundImg});
  background-color: lightgray;
`;

const Start: FC = () => {
  const gameStatus = useGetGameStatus();
  const navigate = useNavigate();

  const renderContent = () => {
    if (gameStatus.game.init && gameStatus.player.init) {
      return gameStatus.player.registered ? <ReadyToPlay /> : <SelectAmount />;
    }
    return <PendingScreen />;
  }

  useEffect(() => {
    if (!gameStatus.game.ableToJoin) {
      navigate('/');
    }
  }, [gameStatus.game]);

  return (
    <AppContainer>
      <Center minH={'calc(100vh - 12.5rem)'} alignItems={'flex-start'}>
        {renderContent()}
      </Center>
    </AppContainer>
  )
}

export default Start;
