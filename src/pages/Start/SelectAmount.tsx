import { FC, useMemo, useState } from "react";
import { Flex, Box, Text, Button, Input, Center } from "@chakra-ui/react";

import AmountBoard from "@/components/AmountBoard";
import { WAGER_AMOUNTS } from "@/constants/game";
import useProgram from "@/hooks/useProgram";
import { BN } from "@coral-xyz/anchor";
import { getAttackPDA, getGamePDA, getPlayerPDA, getPlayerStatsAccount } from "@/utils/www";
import { gameMatchPublicKey } from "@/constants/network";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import { store } from "@/stores/RootStore";

const SelectAmount: FC = () => {
  const { globalStore, gameStore } = store;
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);

  const program = useProgram();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.split('').filter(letter => letter.match(/[a-zA-Z0-9\_]/)).join(''))
  }

  const handleJoinGame = async () => {
    if (globalStore.publicKey && isEnableName) {
      setLoading(true);
      try {
        const match = await program.account.match.fetch(gameMatchPublicKey);
        const [attackAccount] = getAttackPDA(program.programId, match.number, globalStore.publicKey);
        const [playerAccount] = getPlayerPDA(program.programId, match.number, globalStore.publicKey);
        const [playerStatsAccount] = getPlayerStatsAccount(program.programId, globalStore.publicKey);
        const [game] = getGamePDA(program.programId, match.number, gameMatchPublicKey);
        let statExist = true;
        try {
          await program.account.stats.fetch(playerStatsAccount.toString());
        } catch (error) {
          statExist = false;
        }
        if (!statExist) {
          await program.methods.createPlayerStats().accounts({
            playerStatsAccount,
            player: globalStore.publicKey,
          })
          .rpc();
        }
        const entraceFeeTotal = gameStore.gameConfig.entranceFee.mul(new BN(amount))
        await program.methods
          .join(entraceFeeTotal, name)
          .accounts({
            matchAccount: gameMatchPublicKey,
            game,
            attackAccount,
            playerAccount,
            player: globalStore.publicKey,
            playerStatsAccount
          })
          .rpc();
        const [playerPDA] = getPlayerPDA(
          program.programId,
          match.number,
          globalStore.publicKey,
        );
        const player = await program.account.player.fetch(playerPDA);
        gameStore.setMePlayer(true, player.lives, player.attacked.attacker.toString(), player.name);
        // playerStore.setPlayer(player);
      } catch (error) {
        console.log(error);
        toast.error((error as Error).message);
        setLoading(false);
      }
    }
  }

  const isEnableName = useMemo(() => {
    return new Blob([name]).size <= 20;
  }, [name]);

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
            feeBase={gameStore.gameConfig.entranceFee}
            selected={wager.amount === amount}
            onSelected={() => setAmount(wager.amount)}
          />
        ))}
      </Flex>
      <Box textAlign={'center'} py={'0.5rem'}>
        <Input
          fontSize="1.5rem"
          lineHeight="2.2rem"
          variant="unstyled"
          color="#fff"
          py="1rem"
          px="1.25rem"
          bg="button.bg"
          border="0.5rem"
          borderColor={isEnableName ? 'button.border' : '#CD2927'}
          borderStyle="solid"
          borderRadius="3.75rem"
          textAlign={'center'}
          h="auto"
          placeholder="Enter Your Name!"
          w={{ base: '15rem', lg: '18.75rem' }}
          value={name}
          onChange={(event) => handleName(event)}
        />
        {!isEnableName && <Center color={'#fff'} mt={'0.5rem'} bgColor={'#CD2927'} fontSize={'1.25rem'}>Your name is too long</Center>}
      </Box>
      <Flex flexDirection="column" maxW="22.5rem" w={'100%'} gap="1.125rem" py={'1rem'} >
        <Button variant="primary" width="100%" isDisabled={!amount || !isEnableName} pointerEvents={loading ? 'none' : 'auto'} onClick={handleJoinGame}>
          {loading ? 'LOADING...' : 'SELECT'}
        </Button>
        <Button variant="secondary" onClick={() => globalStore.handleRuleModal()}>
          RULES
        </Button>
      </Flex>
    </Flex>
  );
}

export default observer(SelectAmount);
