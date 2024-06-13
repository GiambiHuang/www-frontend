import AppModal from "@/components/AppModal";
import { FC } from "react";
import Close from "@/assets/icons/close.svg?react";

import { Box, Flex, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
import { store } from "@/stores/RootStore";
import { observer } from "mobx-react-lite";

const rules = [
  {
    title: 'Entry and Wagering',
    contents: [
      <Text>The game requires an entry fee of <Text as={'span'} color={'text.warning'}>0.01 ETH</Text></Text>,
      <Text>You may wager additional ETH to add up to 9 more avatars, with each acting as a separate entity within the game, for a maximum of <Text as={'span'} color={'text.warning'}>10 avatars</Text> per player.</Text>
    ],
  },
  {
    title: 'Gameplay',
    contents: [
      <Text>At the start of each round, you <Text as={'span'} color={'text.warning'}>must choose</Text> another player's avatar to aim at (or pick from the hit list)</Text>,
      <Text>You survive the round if it is not targeted by any other avatars.</Text>,
      <Text>The game continues until only one avatar remains untargeted.</Text>
    ]
  },
  {
    title: 'Determining the Winner',
    contents: [
      <Text>The last avatar standing with no other avatar aiming at it wins the entire pot.</Text>,
      <Text>In the event that all avatars are eliminated in a round, the pot goes to the player of the avatar that fired the first shot.</Text>,
    ]
  },
  {
    title: 'Game Frequency and Round Duration',
    contents: [
      <Text>The game occurs once <Text as={'span'} color={'text.warning'}>daily.</Text></Text>,
      <Text>Each round is <Text as={'span'} color={'text.warning'}>30 seconds</Text> long.</Text>,
    ]
  }
];

const Rule: FC = () => {
  return (
    <AppModal open={store.globalStore.ruleModal}>
      <Flex
        justifyContent="center"
        position="relative"
        maxH="35rem"
        maxW="66rem"
        w={'100vw'}
        h={'100vh'}
        fontFamily="Potta One"
        bg="button.border"
        p="5.375rem 2.1875rem"
        borderRadius="1rem"
        border="0.5rem"
        borderStyle="solid"
        borderColor="button.bg"
      >
        <Box
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
          RULES
        </Box>
        <Box position={'absolute'} top="0.75rem" right="0.5rem" cursor={'pointer'} onClick={() => store.globalStore.handleRuleModal(false)}>
          <Close />
        </Box>
        <VStack
          boxSize={'100%'}
          overflowY={'scroll'}
          px={'2.5rem'}
          gap={'0.875rem'}
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
          {rules.map(rule => (
            <Box key={rule.title} w={'100%'}>
              <Text mb={'0.5rem'} color={'#fff'} fontSize={'1.75rem'} lineHeight={'2.625rem'}>{rule.title}</Text>
              <UnorderedList fontSize={'1.5rem'} lineHeight={'2rem'} color={'text.rule'}>
                {rule.contents.map((content, idx) => (
                  <ListItem key={`${rule.title}_${idx}`}>{content}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          ))}
        </VStack>
      </Flex>
    </AppModal>
  );
}

export default observer(Rule);
