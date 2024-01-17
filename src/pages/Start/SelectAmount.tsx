import { FC, useState } from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import AmountBoard from "@/components/AmountBoard";
import { WAGER_AMOUNTS } from "@/constants/game";
import useRuleModal from "@/hooks/useRuleModal";
import useProgram from "@/hooks/useProgram";
import { BN } from "@coral-xyz/anchor";
import { AppWalletState } from "@/stores/global";
import { getAttackPDA, getGamePDA, getPlayerPDA } from "@/utils/www";
import { gameMatchPublicKey } from "@/constants/network";
import { PlayerState } from "@/stores/game";
import useGetGameStatus from "@/hooks/useGetGameStatus";

const SelectAmount: FC = () => {
  const { openModal: openRuleModal } = useRuleModal();
  const [amount, setAmount] = useState<number>(0);
  const setPlayerState = useSetRecoilState(PlayerState);
  const gameStatus = useGetGameStatus();

  const appWallet = useRecoilValue(AppWalletState);
  const [loading, setLoading] = useState<boolean>(false);

  const program = useProgram();

  const handleJoinGame = async () => {
    if (appWallet.publicKey) {
      setLoading(true);
      try {
        const match = await program.account.match.fetch(gameMatchPublicKey);
        const [attackAccount] = getAttackPDA(program.programId, match.number, appWallet.publicKey);
        const [playerAccount] = getPlayerPDA(program.programId, match.number, appWallet.publicKey);
        const [game] = getGamePDA(program.programId, match.number, gameMatchPublicKey);
      
        await program.methods
          .join(gameStatus.fee.mul(new BN(amount)))
          .accounts({
            matchAccount: gameMatchPublicKey,
            game,
            attackAccount,
            playerAccount,
            player: appWallet.publicKey,
          })
          .rpc();
        // console.log('tx::::', tx);
        const [playerPDA] = getPlayerPDA(
          program.programId,
          match.number,
          appWallet.publicKey,
        );
        const player = await program.account.player.fetch(playerPDA);
        setPlayerState({
          lives: player.lives,
          attacked: '',
          points: player.points.points,
          registered: player.registered,
          init: true,
        })
      } catch (error) {
        setLoading(false);
      }
    }
  }

  return (
    <Flex flex={1} mt={'2rem'} flexDirection={'column'} alignItems={'center'}>
      <Box fontFamily={'Potta One'}>
        <svg width="732" fontSize={'5rem'} height="116" viewBox="0 -10 746 82" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#9ED9E3" strokeWidth="1rem" paintOrder="stroke" stroke="#2F6B75">
            WAGER AMOUNT
          </text>
        </svg>
      </Box>
      <Box mt={'1.125rem'} textAlign={'center'} fontSize={'1.5rem'} lineHeight={'1.75rem'}>
        <Text>You can choose to purchase more players in the game to give yourself a</Text>
        <Text>better chance at survival.</Text>
      </Box>
      <Flex gap={'0.875rem'}>
        {WAGER_AMOUNTS.map(wager => (
          <AmountBoard
            key={`wager_amount_${wager.amount}`}
            boxSize={'17.5rem'}
            unit={wager.unit}
            amount={wager.amount}
            feeBase={gameStatus.fee}
            selected={wager.amount === amount}
            onSelected={() => setAmount(wager.amount)}
          />
        ))}
      </Flex>
      <Flex flexDirection="column" maxW="22.5rem" w={'100%'} gap="1.125rem" py={'1rem'} >
        <Button variant="primary" width="100%" isDisabled={!amount} pointerEvents={loading ? 'none' : 'auto'} onClick={handleJoinGame}>
          {loading ? 'LOADING...' : 'SELECT'}
        </Button>
        <Button variant="secondary" onClick={openRuleModal}>
          RULES
        </Button>
      </Flex>
    </Flex>
  );
}

export default SelectAmount;
