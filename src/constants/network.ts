import { web3 } from "@coral-xyz/anchor";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { clusterApiUrl } from "@solana/web3.js";
// export const endpoint = clusterApiUrl(network);

export const network = WalletAdapterNetwork.Devnet;

export const endpoint = 'https://testnet.dev2.eclipsenetwork.xyz/';

// export const programId = 'DKFmaoLpqpc6TFyNwQBRXZhYSqbFctaJqFn9z3xha9ue';

export const programId = 'A2Fi3q37imPUsQrChFMZ42kZz1cgknKewVtNHitm6d2K';
// export const gamePublicKey = new web3.PublicKey('GArUSk4zCdmZJsx9bVF8vTawnJuwbemmSZ11PX2pLAru');
export const gameMatchPublicKey = new web3.PublicKey('6FFrZKXm1tSj9d3GQBWxnXPuE46vvGpEuGSEWLzKWooQ');
