import React from 'react'

import HandGun from '@/assets/images/shotgun.png';
import { Box, Center, Img, keyframes } from '@chakra-ui/react';
import useMousePosition from '@/hooks/useMousePosition';
import useMouseClick from '@/hooks/useMouseClick';

interface IHandHoldingGun {
  stop: boolean;
}

const animationKeyframes = keyframes`
  0% { background-position: 0px 0px; }
  33.3% { background-position: -131px 0px; }
  66.6% { background-position: -240px 0px; }
  100% { background-position: -333px 0px; }
`;

const animation = `${animationKeyframes} 0.5s step-start`; // infinite

const HandHoldingGun: React.FC<IHandHoldingGun> = ({}) => {
  const mousePosition = useMousePosition();
  const mouseDown = useMouseClick();
  return (
    <Box pointerEvents={'none'} pos={'fixed'} left={0} top={0} transform={`translate(${mousePosition.x}px, ${mousePosition.y}px)`}>
      <Center
        bgImage={HandGun}
        bgPos={'0px 0px'}
        animation={mouseDown ? animation : 'none'}
        h={'110px'}
        w={'110px'}
        bgRepeat={'no-repeat'}
        transform={'scale(1.2) translate(-20px, -10px)'}
      />
    </Box>
  )
};

export default HandHoldingGun;
