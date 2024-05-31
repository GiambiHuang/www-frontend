import { FC, useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Box, Center, Flex, Image, Img, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import Close from "@/assets/icons/close.svg?react";
import Crown from "@/assets/images/crown.webp";
import AppModal from "@/components/AppModal";
import { getLeaderboard, LeaderboardPlayer } from "@/apis/game";
import { shortAddress } from "@/utils/shortAddress";
import No1 from '@/assets/images/no1.png';
import No2 from '@/assets/images/no2.png';
import No3 from '@/assets/images/no3.png';
import { store } from "@/stores/RootStore";
import { observer } from "mobx-react-lite";

const Leaderboard: FC = () => {
  const { globalStore } = store;
  const [players, setPlayers] = useState<LeaderboardPlayer[]>([]);

  useEffect(() => {
    globalStore.leaderboardModal && getLeaderboard().then(list => setPlayers(list));
  }, [globalStore.leaderboardModal]);

  const getTextAlign = (field: string) => {
    if (field === 'POINTS') return 'right';
    if (field === 'PLAYER') return 'left';
    return 'center';
  }

  const getNoImage = (idx: number) => {
    if (idx === 0) return No1;
    return idx === 1 ? No2 : No3;
  }
  return (
    <AppModal open={globalStore.leaderboardModal}>
      <Flex justifyContent="center" position="relative" minH="24rem" fontFamily="Potta One" bg="button.border" p="2rem 2.125rem" borderRadius="1rem" border="0.5rem" borderStyle="solid" borderColor="button.bg">
        <Center
          fontSize="2.25rem"
          lineHeight="3.25rem"
          color="#fff"
          bg="button.bg"
          border="0.375rem"
          borderRadius="1.5rem"
          borderStyle="solid"
          borderColor="button.border"
          p="0.5rem 1.5rem"
          position="absolute"
          top="0"
          transform="auto"
          translateY="-50%"
        >
          LEADERBOARD
          <Image src={Crown} position={'absolute'} boxSize={'7.8125rem'} bottom={'calc(100% - 0.625rem)'}/>
        </Center>
        <Box position={'absolute'} top="0.75rem" right="0.5rem" cursor={'pointer'} onClick={() => globalStore.handleLeaderboardModal(false)}>
          <Close />
        </Box>
        <TableContainer>
          <Table variant={'unstyled'}>
            <Thead>
              <Tr>
                {['', 'PLAYER', 'STREAK(DAYS)', 'WINS', 'POINTS'].map(header => (
                  <Th textAlign={getTextAlign(header)} fontFamily={'Potta One'} key={`h_${header}`} fontSize={'1.75rem'} lineHeight={'2.5rem'} color={'#fff'}>
                    {header}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {players.slice(0, 3).map((player, idx) => (
                <Tr key={player.publicKey}>
                  <Td p={'0.5rem 0'}>
                    <Img src={getNoImage(idx)} boxSize={'3.75rem'} />
                  </Td>
                  <Td textAlign={getTextAlign('PLAYER')} fontSize={'2rem'} color={'#444444'}>{shortAddress(player.publicKey, 4, 4)}</Td>
                  <Td textAlign={'center'} fontSize={'2rem'} color={'#444444'}>{player.streak}</Td>
                  <Td textAlign={'center'} fontSize={'2rem'} color={'#444444'}>{player.wins}</Td>
                  <Td textAlign={getTextAlign('POINTS')} fontSize={'2rem'} color={'#444444'}>{player.points}</Td>
                </Tr>
              ))}
              <Tr>
                <Td colSpan={5}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="957" height="4" viewBox="0 0 957 4" fill="none">
                    <path d="M2 2H955" stroke="white" strokeWidth="3" strokeLinecap="round" strokeDasharray="16 16"/>
                  </svg>
                </Td>
              </Tr>
              {players.slice(3).map((player, idx) => (
                <Tr key={player.publicKey}>
                  <Td color={'button.bg'} p={'0.5rem 0'}>
                    <Center mx={'auto'} border={'0.375rem solid'} borderColor={'button.bg'} borderRadius={'50%'} boxSize={'3rem'} fontSize={'1.75rem'}>
                      {idx + 4}
                    </Center>
                  </Td>
                  <Td textAlign={getTextAlign('PLAYER')} fontSize={'2rem'} color={'#444444'}>{shortAddress(player.publicKey, 4, 4)}</Td>
                  <Td textAlign={'center'} fontSize={'2rem'} color={'#444444'}>{player.streak}</Td>
                  <Td textAlign={'center'} fontSize={'2rem'} color={'#444444'}>{player.wins}</Td>
                  <Td textAlign={getTextAlign('POINTS')} fontSize={'2rem'} color={'#444444'}>{player.points}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </AppModal>
  );
}

export default observer(Leaderboard);
