import { web3 } from "@coral-xyz/anchor";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { clusterApiUrl } from "@solana/web3.js";
// export const endpoint = clusterApiUrl(network);

export const network = WalletAdapterNetwork.Devnet;

export const endpoint = 'https://testnet.dev2.eclipsenetwork.xyz/';

// export const programId = 'DKFmaoLpqpc6TFyNwQBRXZhYSqbFctaJqFn9z3xha9ue';

export const programId = '2gQhvsfZWWNp7QzTqP9dWUqtDjmNf4iDSMkqS5E2NbAG';
// export const gamePublicKey = new web3.PublicKey('GArUSk4zCdmZJsx9bVF8vTawnJuwbemmSZ11PX2pLAru');
export const gameMatchPublicKey = new web3.PublicKey('GeAu8yr1Mqj6DgL7rzBr66pnEsPh26LknatWprk1ZnmL');
