import { FC, Fragment, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { ToastContainer } from 'react-toastify';
// import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { SnapWalletAdapter } from '@drift-labs/snap-wallet-adapter';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { endpoint, network } from '@/constants/network';
import useInitWallet from '@/hooks/useInitWallet';
import useInitPlayerState from '@/hooks/useInitPlayerState';
import useInitCurrentGame from '@/hooks/useInitCurrentGame';
import useFetchPlayerEvents from '@/hooks/useFetchPlayerEvents';
import 'react-toastify/dist/ReactToastify.css';
import { observer } from 'mobx-react-lite';

type Props = {
  children?: React.ReactNode
};

const InitWalletLayer: FC<Props> = observer(({ children }) => {
  useInitWallet();
  useInitCurrentGame();
  useInitPlayerState();
  useFetchPlayerEvents();
  return (
    <Fragment>{children}</Fragment>
  );
})

const WalletConnector: FC<Props> = ({ children }) => {
  const wallets = useMemo(
      () => [
        new SnapWalletAdapter(),
        // new PhantomWalletAdapter(),
          /**
           * Wallets that implement either of these standards will be available automatically.
           *
           *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
           *     (https://github.com/solana-mobile/mobile-wallet-adapter)
           *   - Solana Wallet Standard
           *     (https://github.com/solana-labs/wallet-standard)
           *
           * If you wish to support a wallet that supports neither of those standards,
           * instantiate its legacy wallet adapter here. Common legacy adapters can be found
           * in the npm package `@solana/wallet-adapter-wallets`.
           */
          // new UnsafeBurnerWalletAdapter(),
      ],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [network]
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <InitWalletLayer>
                {children}
                <ToastContainer />
              </InitWalletLayer>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
  );
}

export default WalletConnector;
