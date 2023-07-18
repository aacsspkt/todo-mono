"use client"

import React from 'react';

import {
  useAccount,
  useConnect,
  useDisconnect,
} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { shortenAddress } from '@/utils/shortenAddress';

function Navbar(props: {}) {
	const { address, isConnected } = useAccount();

	const { connect } = useConnect({
		connector: new InjectedConnector(),
	});

	const { disconnect } = useDisconnect();

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (isConnected) {
			disconnect();
		} else {
			connect();
		}
	};

	return (
		<header className="w-100 shadow-md">
			<div className="max-w-6xl px-4 py-3 container mx-auto flex flex-row justify-between ">
				<h1 className="font-medium text-2xl">Todoist</h1>
				<button type="button" className="bg-orange-400 text-sm text-white px-2 py-2 rounded-md w-48" onClick={handleClick}>
					{isConnected && address ? shortenAddress(address) : "Connect Wallet"}
				</button>
			</div>
		</header>
	);
}

Navbar.propTypes = {};

export default Navbar;
