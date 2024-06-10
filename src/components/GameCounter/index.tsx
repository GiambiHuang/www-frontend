import { Box, Text, Center, Flex } from "@chakra-ui/react";
import Countdown, { zeroPad } from 'react-countdown'
import { FC, useMemo } from "react";

interface IGameCounter {
  startFrom?: number;
  finished?: boolean;
  now?: number;
  starting?: boolean;
}

const GameCounter: FC<IGameCounter> = ({ startFrom, finished = false, now, starting }) => {
  const text = useMemo(() => {
    if (starting) return 'GAME STARTED';
    if (finished) return 'GAME IS FINISHED';
    return 'GAME STARTS IN';
  }, [starting, finished]);
  return (
    <Box fontSize={{ base: '2.125rem', lg: '2.5rem' }}>
      <Text mb={'0.5rem'} lineHeight={1.15}>
        {text}
      </Text>
      <Center w={{ base: '24rem', lg: '27.5rem' }}>
        <Countdown
          now={() => now || Date.now()}
          date={new Date(startFrom || 0)}
          renderer={({ hours, minutes, seconds }) =>
            <Flex
              w="100%"
              letterSpacing={{ base: '0.75rem', lg: '1rem' }}
              fontSize={{ base: '5rem', lg: '6.25rem' }}
              lineHeight={1}
            >
              <Text flex={1}>{startFrom && !finished ? hours : '-'}</Text>
              <Text>:</Text>
              <Text flex={1}>{startFrom && !finished ? zeroPad(minutes) : '-'}</Text>
              <Text>:</Text>
              <Text flex={1}>{startFrom && !finished ? zeroPad(seconds) : '-'}</Text>
            </Flex>
          }
        />
      </Center>
    </Box>
  );
}

export default GameCounter;
