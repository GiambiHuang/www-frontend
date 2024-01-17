import useConnectModal from "@/hooks/useConnectModal";
import { AppWalletState } from "@/stores/global";
import { shortAddress } from "@/utils/shortAddress";
import { Button, Center } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { FC, useCallback, useMemo } from "react";
import { useRecoilValue } from "recoil";

const ConnectWalletButton: FC = () => {
  const appWallet = useRecoilValue(AppWalletState);
  const { connecting } = useWallet();
  const { openModal } = useConnectModal();
  const publicKey = useMemo(() => appWallet.publicKey && shortAddress(appWallet.publicKey.toString(), 4, 4), [appWallet.publicKey]);

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

export default ConnectWalletButton;
