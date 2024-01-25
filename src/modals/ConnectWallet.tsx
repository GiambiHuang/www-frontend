import AppModal from "@/components/AppModal";
import { ConnectWalletState } from "@/stores/modal";
import { useWallet } from "@solana/wallet-adapter-react";
import { FC } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { styled } from "styled-components";
import MetaMask from "@/assets/icons/metamask.svg?react";
import Salmon from "@/assets/icons/salmon.svg?react";
import Close from "@/assets/icons/close.svg?react";

import { Box, Flex, chakra } from "@chakra-ui/react";

const ConnectWalletOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 30.3125rem;
  padding-top: 4.25rem;
`;

const Option = chakra(Flex, {
  baseStyle: {
    padding: '0.625rem 1rem',
    fontSize: '1.5rem',
    lineHeight: '2.125rem',
    alignItems: 'center',
    color: '#000',
    bg: '#fff',
    border: '0.5rem',
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: '1rem',
    textTransform: 'uppercase',
    cursor: 'pointer',
    gap: '1.5rem',
    _hover: {
      borderColor: 'button.bg'
    }
  },
})

const ConnectWallet: FC = () => {
  const connectWalletState = useRecoilValue(ConnectWalletState);
  const resetConnectWallet = useResetRecoilState(ConnectWalletState);
  const { wallets, select } = useWallet();
  console.log(wallets);
  return (
    <AppModal open={connectWalletState.open}>
      <Flex justifyContent="center" position="relative" minH="24rem" fontFamily="Potta One" bg="button.border" px="2.125rem" borderRadius="1rem" border="0.5rem" borderStyle="solid" borderColor="button.bg">
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
          CONNECT WALLET
        </Box>
        <Box position={'absolute'} top="0.75rem" right="0.5rem" cursor={'pointer'} onClick={resetConnectWallet}>
          <Close />
        </Box>
        <ConnectWalletOptions>
          {wallets.filter(wallet => wallet.adapter.url.includes('drift-labs')).map(wallet => (
            <Option
              key={wallet.adapter.name}
              onClick={() => select(wallet.adapter.name)}
            >
              <MetaMask />
              <Box flex={1}>MetaMask</Box>
              {['Installed', 'Loadable'].includes(wallet.readyState) && <Box fontSize="1.125rem" lineHeight={1} color="text.detected">DETECTED</Box>}
            </Option>
          ))}
          {wallets.filter(wallet => wallet.adapter.name.includes('Salmon')).map(wallet => (
            <Option
              key={wallet.adapter.name}
              onClick={() => select(wallet.adapter.name)}
            >
              <Salmon />
              <Box flex={1}>Salmon</Box>
              {['Installed', 'Loadable'].includes(wallet.readyState) && <Box fontSize="1.125rem" lineHeight={1} color="text.detected">DETECTED</Box>}
            </Option>
          ))}
        </ConnectWalletOptions>
      </Flex>
    </AppModal>
  );
}

export default ConnectWallet;
