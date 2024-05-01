import { FC, Fragment, useEffect, useMemo, useState } from 'react'
import { web3 } from '@coral-xyz/anchor';
import { useNavigate } from 'react-router-dom';
import { Center, chakra, Flex, Grid, GridItem } from '@chakra-ui/react';

import backgroundImg from '@/assets/images/background-game.webp';
import HitList from '@/components/HitList';
import Arena from '@/components/Arena';
import LoserModal from '@/modals/LoserModal';
import WinnerModal from '@/modals/WinnerModal';
import NextRound from '@/modals/NextRound';
import useProgram from '@/hooks/useProgram';
import { gameMatchPublicKey } from '@/constants/network';
import { getAttackPDA, getGamePDA, getPlayerPDA } from '@/utils/www';
import useResetGame from '@/hooks/useResetGame';
import PendingScreen from '@/modals/PendingScreen';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { store } from '@/stores/RootStore';

const Game: FC = () => {
  const { globalStore, gameStore, playerStore, playersStore } = store;
  const navigate = useNavigate();
  const program = useProgram();
  const reset = useResetGame();
  const [pending, setPending] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');

  const handleAttackPlayer = async (publicKey: string) => {
    if (globalStore.publicKey) {
      setSelected('');
      setPending(true);
      const match = await program.account.match.fetch(gameMatchPublicKey);
      const [gameAccount] = getGamePDA(program.programId, match.number, gameMatchPublicKey);
      
      const targetPublicKey = new web3.PublicKey(publicKey);
      const [attackAccount] = getAttackPDA(program.programId, match.number, globalStore.publicKey);
      const [playerAccount] = getPlayerPDA(program.programId, match.number, globalStore.publicKey);
      const [targetAccount] = getPlayerPDA(program.programId, match.number, targetPublicKey);
      try {
        await program.methods
          .attack(new web3.PublicKey(publicKey))
          .accounts({
            matchAccount: gameMatchPublicKey,
            game: gameAccount,
            attackAccount,
            playerAccount,
            targetAccount,
            player: globalStore.publicKey,
          })
          .rpc();
        
        setSelected(targetPublicKey.toString());
      } catch (error) {
        toast.error((error as Error).message);
        setPending(false);
      }
    }
  }

  const handleFinishGame = async () => {
    if (globalStore.publicKey) {
      if (playersStore.winner === globalStore.publicKey.toString()) {
        const match = await program.account.match.fetch(gameMatchPublicKey);
        const [gameAccount] = getGamePDA(program.programId, match.number, gameMatchPublicKey);
        const [winnerAccount] = getPlayerPDA(program.programId, match.number, globalStore.publicKey);
        try {
          await program.methods
            .finish()
            .accounts({
              matchAccount: gameMatchPublicKey,
              gameAccount,
              winnerAccount,
              winner: globalStore.publicKey,
            })
            .rpc();
            reset();
            navigate('/');
        } catch (error) {
          console.log(error);
        }
      } else {
        setTimeout(() => {
          reset();
          navigate('/');
        }, 5000);
      }
    }
  }

  const livePlayers = useMemo(() =>
    Object.entries(playersStore.list)
      .filter(([publicKey]) => !playersStore.deadList[publicKey])
      .map(([publicKey]) => publicKey)
  , [playersStore.deadList, playersStore.list]);

  const selectablePlayers = useMemo(() =>
    livePlayers.filter(publicKey => publicKey !== (globalStore.publicKey?.toString() ?? ''))
  , [livePlayers, globalStore.publicKey]);

  const renderContent = () => {
    const allInit = gameStore.init && playerStore.init && playersStore.init;
    if (allInit && gameStore.started) {
      const publickKey = globalStore.publicKey?.toString() ?? '';
      return (
        <Fragment>
          <Grid
            flex={1}
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(3, 1fr)'
          >
            <GridItem as={Center} rowSpan={2} colSpan={1}>
              <HitList players={selectablePlayers} onClick={handleAttackPlayer} />
            </GridItem>
            <GridItem fontFamily={'Potta One'} as={Center} rowSpan={1} colSpan={1}>
              <chakra.svg flex={1} textShadow={'0 0.25rem 0.25rem rgba(0, 0, 0, 0.25)'} width="200px" fontSize={'10rem'} height="220" viewBox="0 0 200 221" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" strokeWidth="2rem" paintOrder="stroke" stroke="#2F6B75">
                  {gameStore.round.remainingAttackTime}
                </text>
              </chakra.svg>
            </GridItem>
            <GridItem as={Center} rowSpan={1} colSpan={2}>
              <Arena players={livePlayers} onClick={handleAttackPlayer} me={publickKey} />
            </GridItem>
          </Grid>
          {playersStore.deadList[publickKey] && <LoserModal attacker={playersStore.deadList[publickKey].attacker} onFinish={handleFinishGame} />}
          {playersStore.winner && <WinnerModal onFinish={handleFinishGame} />}
          {!playersStore.winner && !playersStore.deadList[publickKey] && gameStore.round.break && <NextRound />}
          {pending && <PendingScreen target={selected} />}
        </Fragment>
      );
    }
    return <PendingScreen />;
  }

  useEffect(() => {
    const allInit = gameStore.init && playerStore.init && playersStore.init;
    if (allInit && (gameStore.finished || !gameStore.started)) {
      navigate('/');
    }
  }, [gameStore.init, gameStore.finished, gameStore.started, playerStore.init, playersStore.init]);

  useEffect(() => {
    if (gameStore.round.num > 0) {
      setPending(false);
    }
  }, [gameStore.round.num]);

  return (
    <Flex flexDirection={'column'} minH={'100vh'} w={'100%'} bgImage={backgroundImg} bgPos={'center'} bgSize={'cover'} bgRepeat={'no-repeat'}>
      {renderContent()}
    </Flex>
  )
}

export default observer(Game)
