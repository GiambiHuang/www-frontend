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
import PendingScreen from '@/modals/PendingScreen';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { store } from '@/stores/RootStore';
import HandHoldingGun from '@/components/HandHoldingGun';

const Game: FC = () => {
  const { globalStore, gameStore } = store;
  const navigate = useNavigate();
  const program = useProgram();
  const [pending, setPending] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');

  const handleAttackPlayer = async (publicKey: string, username?: string) => {
    const deadPlayers = gameStore.gamePlayers.dead.map(dead => dead.player);
    if (globalStore.publicKey && !deadPlayers.includes(globalStore.publicKey.toString())) {
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
        
        setSelected(username ?? targetPublicKey.toString());
      } catch (error) {
        console.log(error);
        toast.error((error as Error).message);
        setPending(false);
      }
    }
  }

  const handleFinishGame = async () => {
    if (globalStore.publicKey && gameStore.isDead.dead) {
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }
  }

  const livePlayers = useMemo(() => {
    const dead = gameStore.gamePlayers.dead.map(dead => dead.player);
    return gameStore.gamePlayers.players
      .filter(player => !dead.includes(player.publicKey.toString()))
  }, [gameStore.gamePlayers.dead, gameStore.gamePlayers.players]);

  const selectablePlayers = useMemo(() =>
    livePlayers.filter(player => player.publicKey !== (globalStore.publicKey?.toString() ?? ''))
  , [livePlayers, globalStore.publicKey]);

  const renderContent = () => {
    const allInit = gameStore.gameConfig.init && gameStore.mePlayer.init && gameStore.gamePlayers.init;
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
          {!gameStore.isWinner && !gameStore.isDead.dead && <HandHoldingGun stop />}
          {!gameStore.isWinner && !gameStore.isDead.dead && gameStore.round.break && <NextRound />}
          {!gameStore.isWinner && gameStore.isDead.dead && <LoserModal attacker={gameStore.isDead.attacker} onFinish={handleFinishGame} />}
          {gameStore.isWinner  && <WinnerModal />}
          {pending && <PendingScreen target={selected} />}
        </Fragment>
      );
    }
    return <PendingScreen />;
  }

  useEffect(() => {
    const allInit = gameStore.gameConfig.init && gameStore.mePlayer.init && gameStore.gamePlayers.init;
    if (allInit) {
      const stay = gameStore.mePlayer.joined && !gameStore.finished && gameStore.started;
      if (!stay) {
        navigate('/');
      }
    }
    if (gameStore.gameConfig.init && gameStore.finished) {
      navigate('/');
    }
  }, [gameStore.gameConfig.init, gameStore.finished, gameStore.started, gameStore.mePlayer.init, gameStore.gamePlayers.init]);

  useEffect(() => {
    if (gameStore.round.num > 0) {
      setPending(false);
    }
  }, [gameStore.round.num]);

  return (
    <Flex userSelect={'none'} flexDirection={'column'} minH={'100vh'} w={'100%'} bgImage={backgroundImg} bgPos={'center'} bgSize={'cover'} bgRepeat={'no-repeat'}>
      {renderContent()}
    </Flex>
  )
}

export default observer(Game)
