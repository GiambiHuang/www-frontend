import { Flex, CenterProps, Center, Image } from "@chakra-ui/react";
import { FC } from "react";

import board from '@/assets/images/background-board.webp';
import boardActive from '@/assets/images/background-board_active.webp';
import avatar from '@/assets/avatars/avatars-1.png';
import { styled } from "styled-components";
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

interface IAmountBoard extends CenterProps {
  selected?: boolean;
  amount: number;
  unit: string;
  feeBase: BN;
  onSelected: (amount: number) => void;
}

const AmountText = styled.div`
  width: 5rem;
  font-family: 'Potta One';
  font-size: 3.75rem;
  line-height: 1.3;
  background: -webkit-linear-gradient(top, rgba(136, 59, 3, 1), rgba(75, 34, 4, 1));
  -webkit-background-clip: text;
  -webkit-text-stroke: 0.75rem transparent;
  color: white; /* same as background */
`

const CostText = styled.div`
  width: 5rem;
  font-size: 1.875rem;
  line-height: 1.1;
  background: -webkit-linear-gradient(top, rgb(234, 98, 0), rgb(184, 77, 0));
  -webkit-background-clip: text;
  -webkit-text-stroke: 0.6rem transparent;
  color: white; /* same as background */
`

const UnitText = styled.div`
  margin-top: -0.175rem;
  width: 5rem;
  font-size: 1.875rem;
  line-height: 1.1;
  background: -webkit-linear-gradient(top, rgb(184, 77, 0), rgb(133, 56, 0));
  -webkit-background-clip: text;
  -webkit-text-stroke: 0.6rem transparent;
  color: white; /* same as background */
`

const AmountBoard: FC<IAmountBoard> = ({ selected, amount, unit, feeBase, onSelected, ...props }) => {
  return (
    <Center
      {...props}
      bgImage={selected ? boardActive : board}
      bgSize="contain"
      bgPosition="center"
      bgRepeat={'no-repeat'}
      position="relative"
      cursor={'pointer'}
      _hover={{
        bgImage: boardActive,
      }}
      onClick={onSelected}
    >
      <Flex gap={'0.5rem'}>
        <Image w={'7.5rem'} src={avatar} />
        <Center gap={'0.5rem'} textAlign={'center'} flexDirection={'column'}>
          <AmountText>
            {amount}
          </AmountText>
          <Center flexDirection={'column'}>
            <CostText>
              {feeBase.mul(new BN(amount)).toNumber() / LAMPORTS_PER_SOL}
            </CostText>
            <UnitText>{unit}</UnitText>
          </Center>
        </Center>
      </Flex>
    </Center>
  );
}

export default AmountBoard;
