import * as anchor from '@coral-xyz/anchor';

export const numToUint8Array = (num: number) => {
  return new anchor.BN(num).toArrayLike(Buffer, "be", 4);
};

export const getGamePDA = (
  programID: anchor.web3.PublicKey,
  matchNumber: number,
  matchAccount: anchor.web3.PublicKey
) => {
  return anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("game"),
      numToUint8Array(matchNumber),
      matchAccount.toBuffer(),
    ],
    programID
  );
};

export const getAttackPDA = (
  programID: anchor.web3.PublicKey,
  matchNumber: number,
  matchAccount: anchor.web3.PublicKey
) => {
  return anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("attack"),
      matchAccount.toBuffer(),
      numToUint8Array(matchNumber),
    ],
    programID
  );
};

export const getPlayerPDA = (
  programID: anchor.web3.PublicKey,
  matchNumber: number,
  matchAccount: anchor.web3.PublicKey
) => {
  return anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("player"),
      matchAccount.toBuffer(),
      numToUint8Array(matchNumber),
    ],
    programID
  );
};
