import useConnectModal from "@/hooks/useConnectModal";
import { store } from "@/stores/RootStore";
import { shortAddress } from "@/utils/shortAddress";
import { Button, Center } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useMemo } from "react";

const ConnectWalletButton: FC = () => {
  const { globalStore } = store;
  const { connecting } = useWallet();
  const { openModal } = useConnectModal();
  const publicKey = useMemo(() => globalStore.publicKey && shortAddress(globalStore.publicKey.toString(), 4, 4), [globalStore.publicKey]);

  const handleClick = useCallback(() => {
    if (!connecting) {
      openModal();
    }
  }, [publicKey, connecting]);
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
        {connecting ? 'CONNECTING...' : (publicKey || 'CONNECT WALLET')}
      </Center>
    </Button>
  );
}

export default observer(ConnectWalletButton);
