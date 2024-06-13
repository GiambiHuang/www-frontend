import { store } from "@/stores/RootStore";
import { shortAddress } from "@/utils/shortAddress";
import { Button, Center } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useMemo, useState } from "react";

import CopySVG from '@/assets/icons/copy.svg?react';
import CopySuccessSVG from '@/assets/icons/copy-success.svg?react';

const ConnectWalletButton: FC = () => {
  const { globalStore } = store;
  const [copied, setCopied] = useState(false);
  const { connecting } = useWallet();
  const publicKey = useMemo(() => globalStore.publicKey && shortAddress(globalStore.publicKey.toString(), 4, 4), [globalStore.publicKey]);

  const handleClick = useCallback(() => {
    if (!connecting) {
      globalStore.handleConnectModal();
    }
  }, [publicKey, connecting]);

  const renderContent = () => {
    if (connecting) return <Center>CONNECTING...</Center>
    if (!publicKey) return <Center>CONNECT WALLET</Center>
    return (
      <Center gap={'0.5rem'}>
        {publicKey}
        <Center
          boxSize={'2rem'}
          color={copied ? 'button.border' : '#fff'}
          _hover={{ color: 'button.border' }}
          onClick={(event) => {
            event.stopPropagation();
            if (!copied) {
              navigator.clipboard.writeText(globalStore.publicKey?.toString() ?? '');
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }
          }}
        >
          {copied ? <CopySuccessSVG width={'100%'} height={'auto'} /> : <CopySVG width={'100%'} height={'auto'} />}
        </Center>
      </Center>
    );
  }
  return (
    <Button
      fontSize="1.5rem"
      lineHeight="2.2rem"
      variant="unstyled"
      color="#fff"
      py="1rem"
      px="1.25rem"
      bg="button.bg"
      border="0.5rem"
      borderColor="button.border"
      borderStyle="solid"
      borderRadius="3.75rem"
      h="auto"
      onClick={handleClick}
      w={{ base: '15rem', lg: '18.75rem' }}
    >
      <Center>
        {renderContent()}
      </Center>
    </Button>
  );
}

export default observer(ConnectWalletButton);
