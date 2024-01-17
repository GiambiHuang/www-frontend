import { useWallet } from "@solana/wallet-adapter-react";
import { useSetRecoilState } from "recoil";

import { AppWalletState } from "@/stores/global";
import { useEffect } from "react";
import useConnectModal from "./useConnectModal";
// import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

const useInitWallet = () => {
  const setAppWalletState = useSetRecoilState(AppWalletState);
  const { closeModal } = useConnectModal();
  const { publicKey, connected } = useWallet();

  // const testFunc = async () => {
  //   if (publicKey) {
  //     const balance = await connection.getBalance(publicKey);

  //     // const balance2 = await connection.getBalance(new PublicKey("HwVXAfER3zENStQ8fx149geUwnos5sPmYSRk5jgFJ4kg"));
  //     const tx = new Transaction().add(
  //       SystemProgram.transfer({
  //         fromPubkey: publicKey,
  //         toPubkey: new PublicKey("HwVXAfER3zENStQ8fx149geUwnos5sPmYSRk5jgFJ4kg"),
  //         lamports: LAMPORTS_PER_SOL * 0.2,
  //       })
  //     )
  //     const signature = await sendTransaction(tx, connection);
  //     const latestBlockHash = await connection.getLatestBlockhash();
  //     await connection.confirmTransaction({
  //       blockhash: latestBlockHash.blockhash,
  //       lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
  //       signature,
  //     })
  //     // const s = await connection.sen(tx, [publicKey, new PublicKey("HwVXAfER3zENStQ8fx149geUwnos5sPmYSRk5jgFJ4kg")]);
  //   }
  // }
  useEffect(() => {
    setAppWalletState({
      publicKey: publicKey || null,
      twitter: '',
      connected,
    })
    if (connected) {
      closeModal();
    }
  }, [publicKey]);
}

export default useInitWallet;
