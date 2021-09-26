import React, { useEffect } from "react";
import { useState } from "react";
import useWalletConnection from "../hooks/wallet-connect";

const WalletContext = React.createContext({
    walletAddress: '',
    walletStatus: '',
    connect: () => { }
});

export const WalletContextProvider = (props: { children: React.ReactChild }) => {
    const [wallet, setWallet] = useState("");
    const [status, setStatus] = useState("");

    const { walletAddress, walletStatus, connectWallet } = useWalletConnection();

    const connectHandler = async () => {
        const { address, status } = await connectWallet();
        setWallet(address);
        setStatus(status);
    }

    const contextValue = {
        walletAddress: wallet,
        walletStatus: status,
        connect: connectHandler
    }

    useEffect(() => {
        setWallet(walletAddress);
        setStatus(walletStatus);
    }, [walletAddress, walletStatus])

    return <WalletContext.Provider value={contextValue}>{props.children}</WalletContext.Provider>
}

export default WalletContext;