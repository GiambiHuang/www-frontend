import { Flex, Text } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React, { useMemo } from 'react'
import ChakraBox from '../ChakraBox';
import JackpotImage from '@/assets/images/jackpot.png';

interface IJackpot {
  amount: number;
}

const Jackpot: React.FC<IJackpot> = ({ amount }) => {
  const amountLabel = useMemo(() => {
    const minLength = amount > 10 ? `${amount * 10}`.length : 1;
    const [amountLeft = '', amountRight = '00'] = `${amount}`.split('.');
    const left = (Array(minLength).join('0') + amountLeft).slice(-minLength)
    return new Array(minLength).fill('0').map((val, idx) => left[idx] || val).concat(['.', ...amountRight])
  }, [amount]);
  return (
    <Flex
      fontSize={'2.5rem'}
      fontFamily={'Potta One'}
      bgImg={JackpotImage}
      w={'22.5rem'}
      h={'7.5rem'}
      p={'0.75rem 3rem 0rem'}
      bgRepeat={'no-repeat'}
      bgSize={'contain'}
      bgPos={'center'}
      color={'#FFC700'}
    >
      <Flex flex={1} justifyContent={'center'}>
        <AnimatePresence mode='popLayout'>
          {amountLabel.map((text, idx) => (
            <ChakraBox
              key={`${text}${idx}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <Text w={text === '.' ? '1rem' : '1.75rem'} textAlign={'center'}>
                {text}
              </Text>
            </ChakraBox>
          ))}
          <Text pl={'0.5rem'}>ETH</Text>
        </AnimatePresence>
      </Flex>
    </Flex>
  )
};

export default Jackpot;
