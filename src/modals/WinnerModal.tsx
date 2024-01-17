import AppModal from "@/components/AppModal";
import { Box, Center, Grid, GridItem, chakra, shouldForwardProp } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import backgroundImg from '@/assets/images/background-result.webp'
import { isValidMotionProp, motion } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const WinnerModal: FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [go, setGo] = useState(false);

  useEffect(() => {
    setTimeout(() => { setGo(true) }, 1000);
  }, []);

  useEffect(() => {
    if (go) {
      onFinish();
    }
  }, [go]);

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
            </ChakraBox>
          )}
        </Center>
      </Box>
    </AppModal>
  );
}

export default WinnerModal;
