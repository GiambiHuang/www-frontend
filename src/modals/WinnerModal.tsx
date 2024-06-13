import AppModal from "@/components/AppModal";
import { Box, Button, Center, Grid, GridItem, chakra, shouldForwardProp } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import backgroundImg from '@/assets/images/background-result.webp'
import { isValidMotionProp, motion } from "framer-motion";
import { toast } from "react-toastify";
import useProgram from "@/hooks/useProgram";
import { gameMatchPublicKey } from "@/constants/network";
import { getGamePDA, getPlayerPDA, getPlayerStatsAccount } from "@/utils/www";
import { useWallet } from "@solana/wallet-adapter-react";
import { store } from "@/stores/RootStore";
import { useNavigate } from "react-router-dom";

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const WinnerModal: FC = () => {
  const [go, setGo] = useState(false);
  const program = useProgram();
  const { publicKey } = useWallet();
  const navigate = useNavigate();
  const [claiming, setClaiming] = useState(false);

  const handleClaim = async () => {
    if (!publicKey) return;
    setClaiming(true);
    try {
      const match = await program.account.match.fetch(gameMatchPublicKey);
      const [gameAccount] = getGamePDA(program.programId, match.number, gameMatchPublicKey);
      const [winnerAccount] = getPlayerPDA(program.programId, match.number, publicKey);
      const [playerStatsAccount] = getPlayerStatsAccount(program.programId, publicKey);
      await program.methods
        .finish()
        .accounts({
          matchAccount: gameMatchPublicKey,
          gameAccount,
          winnerAccount,
          winner: publicKey,
          admin: match.admin,
          playerStatsAccount
        })
        .rpc();
        store.gameStore.refresh();
        navigate('/');
    } catch (error) {
      toast.error((error as Error).message);
      setClaiming(false);
    }
  }

  useEffect(() => {
    setTimeout(() => { setGo(true) }, 1000);
  }, []);

  return (
    <AppModal open motionPreset="none">
      <Box bgColor={'#ffffff'}>
        <Center
          flexDirection={'column'}
          w={'100vw'}
          h={'100vh'}
          bgImage={backgroundImg}
          bgSize={'cover'}
          bgRepeat={'no-repeat'}
          bgPos={'top center'}
          fontFamily={'Potta One'}
          gap={'4rem'}
          bgColor={'lightgray'}
          opacity={0.8}
        >
          {
            go && (
              <ChakraBox
                mt={'5rem'}
                initial={{ scale: 0.6, opacity: 0.3 }}
                animate={{ scale: 1, opacity: 1 }}
                transitionDuration={'1s'}
                transitionTimingFunction={'cubic-bezier(1, 0.18, 0.26, 1.27)'}
                display={'flex'}
                flexDirection={'column'}
              >
                <chakra.svg width="800" fontSize={'6.875rem'} height="120" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#FD6" strokeWidth="1rem" paintOrder="stroke" stroke="#EA6200">
                    YOU’RE
                  </text>
                </chakra.svg>
                <chakra.svg width="800" fontSize={'6.875rem'} height="120" viewBox="-10 0 820 150" xmlns="http://www.w3.org/2000/svg">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#FD6" strokeWidth="1rem" paintOrder="stroke" stroke="#EA6200">
                    THE WINNER!
                  </text>
                </chakra.svg>
              </ChakraBox>
            )
          }
          {go && (
            <ChakraBox
              initial={{ opacity: 0.3, translateY: "1rem" }}
              animate={{ opacity: 1, translateY: "0" }}
              transitionDuration="0.3s"
              transitionTimingFunction="linear"
            >
              <Grid
                border={'0.5rem'}
                borderStyle={'solid'}
                borderColor={'button.bg'}
                bg={'button.border'}
                borderRadius={'1rem'}
                p={'1.875rem 1.25rem'}
                gridTemplateColumns='1fr 15rem'
                gap={'1rem'}
                w={'37.5rem'}
              >
                <GridItem textAlign={'right'} fontSize={'1.75rem'} color={'#444444'}>
                  POINTS EARNED
                </GridItem>
                <GridItem textAlign={'center'} fontSize={'2rem'} color={'#fff'}>
                  100
                </GridItem>
              </Grid>
              <Center py={'2rem'}>
                <Button variant="primary" width="20rem" isDisabled={claiming} onClick={handleClaim}>
                  Claim Reward
                </Button>
              </Center>
            </ChakraBox>
          )}
        </Center>
      </Box>
    </AppModal>
  );
}

export default WinnerModal;
