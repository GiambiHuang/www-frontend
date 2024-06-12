import React from 'react'

import HandGun from '@/assets/images/shotgun.png';
import { Box, Center, Img } from '@chakra-ui/react';
import useMousePosition from '@/hooks/useMousePosition';

interface IHandHoldingGun {
  stop: boolean;
}

const HandHoldingGun: React.FC<IHandHoldingGun> = ({}) => {
  const mousePosition = useMousePosition();
  return (
    <Box pointerEvents={'none'} pos={'fixed'} left={0} top={0} transform={`translate(${mousePosition.x}px, ${mousePosition.y}px)`}>
      <Center
        bgImage={HandGun}
        bgPos={'0 0'}
        h={'110px'}
        w={'110px'}
        bgRepeat={'no-repeat'}
        transform={'scale(1.2) translate(-20px, -10px)'}
      />
    </Box>
  )
};

export default HandHoldingGun;
