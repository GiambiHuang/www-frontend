import { Box, Center, Flex, Input, VStack } from "@chakra-ui/react";
import { FC, useState } from "react";

import SearchIcon from '@/assets/icons/search.svg?react';
import TargetIcon from '@/assets/icons/target.svg?react';
// import { shortAddress } from "@/utils/shortAddress";

interface IHitList {
  players: { publicKey: string, name: string }[];
  onClick: (publicKey: string, username?: string) => Promise<void>;
}

const HitList: FC<IHitList> = ({ players, onClick }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [search, setSearch] = useState('');
  
  const handleClick = async (player: { publicKey: string, name: string }) => {
    setSelectedPlayer(player.publicKey);
    try {
      await onClick(player.publicKey, player.name);
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedPlayer('');
    }
  }
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
        HIT LIST
      </Box>
      <Flex w={'100%'} flexDirection={'column'} gap={'1rem'}>
        <Center as="label" htmlFor="search" position={'relative'}>
          <Input
            bg={'button.bg'}
            color={'#fff'}
            py={'0.5rem'}
            pl={'3rem'}
            pr={'0.75rem'}
            _placeholder={{ color: '#fff' }}
            placeholder='SEARCH...'
            borderRadius={'0.75rem'}
            border={'none'}
            boxShadow={'0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.25) inset'}
            _focusVisible={{}}
            fontFamily="Potta One"
            id="search"
            autoComplete="off"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Box position={'absolute'} boxSize={'1.5rem'} left={'0.75rem'}>
            <SearchIcon />
          </Box>
        </Center>
        <VStack
          w={'100%'}
          maxH={'30rem'}
          minH={'50vh'}
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
          {players
            .filter(({ publicKey, name }) => publicKey.toLowerCase().includes(search.toLowerCase()) || name.toLowerCase().includes(search.toLowerCase()))
            .map((player, idx) => (
              <Flex
                key={player.publicKey}
                w={'100%'}
                fontSize={'1.5rem'}
                boxShadow={'2px 2px 4px 0px rgba(0, 0, 0, 0.25) inset'}
                bg={'transparent'}
                borderRadius={'0.5rem'}
                cursor={'pointer'}
                position={'relative'}
                onClick={() => handleClick(player)}
                _hover={{
                  '.selected': {
                    visibility: 'visible'
                  }
                }}
                pointerEvents={selectedPlayer ? 'none' : 'auto'}
              >
                <Box borderLeftRadius={'0.5rem'} flex={'0 0 2.5rem'} textAlign={'center'} color={'#fff'} bg={'button.bg'} fontFamily={'Potta One'}>{idx + 1}</Box>
                <Box borderRightRadius={'0.5rem'} bg={'#fff'} flex={1} lineHeight={1} p={'0.5rem 0.75rem'}>
                  {player.name}
                  {/* {shortAddress(publicKey, 4, 4)} */}
                </Box>
                <Box className="selected" visibility={selectedPlayer === player.publicKey ? 'visible' : 'hidden'} zIndex={1} pos={'absolute'} right={'0.5rem'}>
                  <TargetIcon />
                </Box>
              </Flex>
            ))
          }
        </VStack>
      </Flex>
    </Flex>
  );
}

export default HitList;
