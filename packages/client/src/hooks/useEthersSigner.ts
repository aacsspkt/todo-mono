import * as React from 'react';

import {
  BrowserProvider,
  JsonRpcSigner,
} from 'ethers';
import {
  useWalletClient,
  type WalletClient,
} from 'wagmi';

import { BSC_TESTNET_CHAIN_ID } from '@/constants';

export function walletClientToSigner(walletClient: WalletClient) {
	const { account, chain, transport } = walletClient;
	console.log("chain", chain);

	// const network = {
	// 	chainId: chain.id,
	// 	name: chain.name,
	// 	ensAddress: chain.contracts?.ensRegistry?.address,
	// };
	const provider = new BrowserProvider(transport, BSC_TESTNET_CHAIN_ID);
	const signer = new JsonRpcSigner(provider, account.address);
	return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
	const { data: walletClient } = useWalletClient({ chainId });
	return React.useMemo(() => (walletClient ? walletClientToSigner(walletClient) : undefined), [walletClient]);
}
