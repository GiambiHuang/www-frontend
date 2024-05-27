import { Box, Center, Flex, chakra } from "@chakra-ui/react";
import { FC } from "react";

import Avatar1 from '@/assets/avatars/avatar-2.png';
import Avatar2 from '@/assets/avatars/avatar-3.png';
import Avatar3 from '@/assets/avatars/avatar-4.png';
import { shortAddress } from "@/utils/shortAddress";
import TargetIcon from '@/assets/icons/target.svg?react';

interface IArena {
  players: string[];
  me: string;
  onClick: (publicKey: string) => void;
}

const avatarMap = [
  Avatar1,
  Avatar2,
  Avatar3,
];

const Arena: FC<IArena> = ({ players, me, onClick }) => {
  return (
    <Flex gap={'0.25rem'}>
      {players.filter(player => player !== me).map((player, idx) => (
        <Center
          key={player}
          pos={'relative'}
          userSelect={'none'}
          cursor={'pointer'}
          color={'#fff'}
          _hover={{
            '.avatar': {
              opacity: '0.8'
            },
            '.target-icon': {
              visibility: 'visible'
            }
          }}
          pointerEvents={'auto'}
          onClick={() => onClick(player)}
        >
          <Box zIndex={10} pos={'absolute'} boxSize={'3rem'} className="target-icon" visibility={'hidden'}>
            <TargetIcon />
          </Box>
          <chakra.svg className="avatar-address" pos={'absolute'} top={'-0.5rem'} flex={1} width="72" fontSize={'1.125rem'} height="25" viewBox="0 0 72 25" xmlns="http://www.w3.org/2000/svg">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" strokeWidth="0.125rem" paintOrder="stroke" stroke="#2F6B75">
              {shortAddress(player, 4, 4)}
            </text>
          </chakra.svg>
          <Box
            className="avatar"
            bgImg={avatarMap[idx % 3]}
            w={'6.25rem'}
            h={'8.75rem'}
            bgSize={'cover'}
            bgPos={'center'}
            bgRepeat={'no-repeat'}
          />
        </Center>
      ))}
    </Flex>
  );
}

export default Arena;
