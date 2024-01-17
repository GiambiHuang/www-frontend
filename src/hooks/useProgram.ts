import { programId } from "@/constants/network";
import { IDL } from "@/contracts/www";
import { useMemo } from "react"
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program } from "@coral-xyz/anchor";

const useProgram = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const provider = useMemo(() => {
    if (wallet) {
      return new AnchorProvider(connection, wallet, { preflightCommitment: 'processed' });
    }
    return null;
  }, [connection, wallet]);
  const program = useMemo(() => new Program(IDL, programId, provider ?? { connection }), [provider]);
  return program;
}

export default useProgram;
