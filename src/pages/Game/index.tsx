import { FC, Fragment, useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
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
import useGetGameStatus from '@/hooks/useGetGameStatus';
import { AppWalletState } from '@/stores/global'

const Game: FC = () => {
  const appWallet = useRecoilValue(AppWalletState);
  const gameStatus = useGetGameStatus();
  const navigate = useNavigate();
  const program = useProgram();
  const reset = useResetGame();
  const [pending, setPending] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');

  const handleAttackPlayer = async (publicKey: string) => {
    if (appWallet.publicKey) {
      setSelected('');
      setPending(true);
      const match = await program.account.match.fetch(gameMatchPublicKey);
      const [gameAccount] = getGamePDA(program.programId, match.number, gameMatchPublicKey);
      
      const targetPublicKey = new web3.PublicKey(publicKey);
      const [attackAccount] = getAttackPDA(program.programId, match.number, appWallet.publicKey);
      const [playerAccount] = getPlayerPDA(program.programId, match.number, appWallet.publicKey);
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
            player: appWallet.publicKey,
          })
          .rpc();
        
        setSelected(targetPublicKey.toString());
      } catch (error) {
        console.log(error);
        // toast.error('----');
        setPending(false);
      }
    }
  }

  const handleFinishGame = async () => {
    if (appWallet.publicKey) {
      if (gameStatus.player.win) {
        const match = await program.account.match.fetch(gameMatchPublicKey);
        const [gameAccount] = getGamePDA(program.programId, match.number, gameMatchPublicKey);
        const [winnerAccount] = getPlayerPDA(program.programId, match.number, appWallet.publicKey);
        try {
          await program.methods
            .finish()
            .accounts({
              matchAccount: gameMatchPublicKey,
              gameAccount,
              winnerAccount,
              winner: appWallet.publicKey,
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
    Object.entries(gameStatus.players.list)
      .filter(([_, player]) => !!player.lives)
      .map(([publicKey]) => publicKey)
  , [gameStatus.players.dead]);

  const selectablePlayers = useMemo(() =>
    livePlayers.filter(publicKey => publicKey !== (appWallet.publicKey?.toString() ?? ''))
  , [livePlayers, appWallet.publicKey]);

  const renderContent = () => {
    const { game, player, players } = gameStatus;
    const allInit = game.init && player.init && players.init;
    if (allInit && game.started) {
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
                  {gameStatus.round.remainingAttackTime}
                </text>
              </chakra.svg>
            </GridItem>
            <GridItem as={Center} rowSpan={1} colSpan={2}>
              <Arena players={livePlayers} onClick={handleAttackPlayer} me={appWallet.publicKey?.toString() ?? ''} />
            </GridItem>
          </Grid>
          {gameStatus.player.dead && <LoserModal attacker={gameStatus.player.attacker} onFinish={handleFinishGame} />}
          {gameStatus.player.win && <WinnerModal onFinish={handleFinishGame} />}
          {!gameStatus.player.win && !gameStatus.player.dead && gameStatus.round.break && <NextRound />}
          {pending && <PendingScreen target={selected} />}
        </Fragment>
      );
    }
    return <PendingScreen />;
  }

  useEffect(() => {
    const { game, player, players } = gameStatus;
    const allInit = game.init && player.init && players.init;
    if (allInit && game.finished) {
      navigate('/');
    }
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus.round.number > 0) {
      setPending(false);
    }
  }, [gameStatus.round.number]);

  return (
    <Flex flexDirection={'column'} minH={'100vh'} w={'100%'} bgImage={backgroundImg} bgPos={'center'} bgSize={'cover'} bgRepeat={'no-repeat'}>
      {renderContent()}
    </Flex>
  )
}

export default Game
