import AppModal from "@/components/AppModal";
import { Box, Center, Grid, GridItem, chakra, shouldForwardProp } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import backgroundImg from '@/assets/images/background-result.webp'
import { isValidMotionProp, motion } from "framer-motion";
// import { shortAddress } from "@/utils/shortAddress";

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
const LoserModal: FC<{ attacker: string, onFinish: () => void }> = ({ attacker, onFinish }) => {
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
      <ChakraBox
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transitionDuration="0.5s"
        transitionTimingFunction="linear"
      >
        <Center
          flexDirection={'column'}
          w={'100vw'}
          h={'100vh'}
          bgImage={backgroundImg}
          bgSize={'cover'}
          bgRepeat={'no-repeat'}
          bgPos={'top center'}
          fontFamily={'Potta One'}
          gap={'10rem'}
          bgBlendMode={'luminosity'}
          transitionDelay={'0.5s'}
          transitionDuration={'0.5s'}
          bgColor={go ? 'lightgray' : 'transaprent'}
        >
          {
            go && (
              <ChakraBox
                initial={{ scale: 1.6, opacity: 0.3 }}
                animate={{ scale: 1, opacity: 1 }}
                zIndex={1}
                transitionDuration={'1s'}
                transitionTimingFunction={'cubic-bezier(.81,.31,.26,1.27)'}
              >
                <Box
                  border={'0.9375rem'}
                  borderStyle={'solid'}
                  borderColor={'text.red'}
                  borderRadius={'3.75rem'}
                  fontSize={'6.875rem'}
                  lineHeight={'10rem'}
                  color={'text.red'}
                  p={'1.5rem 2.625rem'}
                  transform={'rotate(-10deg)'}
                  bg={'rgba(255, 255, 255, 0.3)'}
                  mt={'10rem'}
                >
                  DEAD CACTUS!
                </Box>
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
                templateRows='repeat(2, 1fr)'
                gap={'1rem'}
              >
                <GridItem textAlign={'right'} fontSize={'1.75rem'} color={'#444444'}>
                  KILLED BY
                </GridItem>
                <GridItem textAlign={'center'} fontSize={'2rem'} color={'#fff'}>
                  {attacker}
                </GridItem>
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
      </ChakraBox>
    </AppModal>
  );
}

export default LoserModal;
