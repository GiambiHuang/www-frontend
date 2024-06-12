import { shortAddress } from "@/utils/shortAddress";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { FC } from "react";

const DeadList: FC<{ dead: { player: string, attacker: string }[] }> = ({ dead }) => {
  console.log('dead list:', dead);
  return (
    <Flex justifyContent="center" position="relative" maxW={'21.25rem'} w={'100%'} pt={'3rem'} pb={'1.875rem'} bg="button.border" px="1.25rem" borderRadius="1rem" border="0.375rem" borderStyle="solid" borderColor="button.bg">
      <Box
        fontSize="2.25rem"
        lineHeight="3.25rem"
        color="#fff"
        bg="button.bg"
        border="0.375rem"
        borderRadius="1rem"
        borderStyle="solid"
        borderColor="button.border"
        p="0.5rem 1.5rem"
        position="absolute"
        top="0"
        transform="auto"
        translateY="-50%"
        fontFamily="Potta One"
      >
        DEAD LIST
      </Box>
      <Flex w={'100%'} flexDirection={'column'} gap={'1rem'}>
        <VStack
          w={'100%'}
          maxH={'30rem'}
          minH={'30rem'}
          overflowY={'scroll'}
          pr={'1.5rem'}
          gap={'0.5rem'}
          sx={{
            '&::-webkit-scrollbar': {
              width: '0.75rem',
            },
            '&::-webkit-scrollbar-track': {
              width: '0',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#2F6B75',
              borderRadius: '0.375rem',
            },
          }}
        >
          {dead.map((player, idx) => (
            <Flex
              key={player.player}
              w={'100%'}
              fontSize={'1.5rem'}
              boxShadow={'2px 2px 4px 0px rgba(0, 0, 0, 0.25) inset'}
              bg={'transparent'}
              borderRadius={'0.5rem'}
              position={'relative'}
            >
              <Box borderLeftRadius={'0.5rem'} flex={'0 0 2.5rem'} textAlign={'center'} color={'#fff'} bg={'button.bg'} fontFamily={'Potta One'}>{idx + 1}</Box>
              <Box borderRightRadius={'0.5rem'} bg={'#fff'} flex={1} lineHeight={1} p={'0.5rem 0.75rem'}>
                {shortAddress(player.player, 4, 4)}
              </Box>
            </Flex>
          ))}
        </VStack>
      </Flex>
    </Flex>
  );
}

export default DeadList;
