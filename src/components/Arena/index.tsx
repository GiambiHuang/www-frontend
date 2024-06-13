import { Box, Center, Flex, chakra } from "@chakra-ui/react";
import { FC } from "react";

import Avatar1 from '@/assets/avatars/avatar-2.png';
import Avatar2 from '@/assets/avatars/avatar-3.png';
import Avatar3 from '@/assets/avatars/avatar-4.png';
import TargetIcon from '@/assets/icons/target.svg?react';

interface IArena {
  players: { publicKey: string, name: string }[];
  me: string;
  onClick: (publicKey: string, username: string) => void;
}

const avatarMap = [
  Avatar1,
  Avatar2,
  Avatar3,
];

const Arena: FC<IArena> = ({ players, me, onClick }) => {

  const isDubName = (publicKey: string, name: string) => {
    const isDub = players.findIndex(player => player.publicKey !== publicKey && player.name === name);
    return isDub >= 0 ? `${name}(...${publicKey.slice(-4)})` : name;
  }

  return (
    <Flex gap={'0.25rem'}>
      {players.filter(player => player.publicKey !== me).map((player, idx) => (
        <Center
          key={player.publicKey}
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
          onClick={() => onClick(player.publicKey, player.name)}
        >
          <Box zIndex={10} pos={'absolute'} boxSize={'3rem'} className="target-icon" visibility={'hidden'}>
            <TargetIcon />
          </Box>
          <chakra.svg className="avatar-address" pos={'absolute'} top={'-0.5rem'} flex={1} width="72" fontSize={'1.125rem'} height="25" viewBox="0 0 72 25" xmlns="http://www.w3.org/2000/svg">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" strokeWidth="0.125rem" paintOrder="stroke" stroke="#2F6B75">
              {/* {shortAddress(player, 4, 4)} */}
              {isDubName(player.publicKey, player.name)}
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
