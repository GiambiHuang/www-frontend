import AppModal from "@/components/AppModal";
import { Text, Center, chakra, shouldForwardProp, Box } from "@chakra-ui/react";
import { FC } from "react";

import LoadingIcon from '@/assets/icons/loading.svg?react';
import { isValidMotionProp, motion } from "framer-motion";
// import { shortAddress } from "@/utils/shortAddress";

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

interface IPendingScreen {
  target?: string;
}

const PendingScreen: FC<IPendingScreen> = ({ target }) => {
  return (
    <AppModal open motionPreset="none">
      <Center
        w={'100vw'}
        h={'100vh'}
        gap={'6.25rem'}
        bgColor={'rgba(68, 68, 68, 0.9)'}
      >
        <Center fontFamily="Potta One" flexDirection={'column'} gap={'2rem'}>
          <ChakraBox
            animate={{
              rotate: [0, 360],
            }}
            // @ts-ignore no problem in operation, although type error appears.
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <LoadingIcon />
          </ChakraBox>
          {target && (
            <Box textAlign={'center'} color={'#fff'}>
              <Text fontSize={'3.125rem'}>You aimed at</Text>
              <Text color={'#FD6'} fontSize={'4.375rem'}>{target}</Text>
            </Box>
          )}
        </Center>
      </Center>
    </AppModal>
  );
}

export default PendingScreen;
