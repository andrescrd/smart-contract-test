import { useEffect, useState } from "react";

const CONNECTED = "😆 Connected";
const MUST_INSTALL_METAMASK = "You must install Metamask, a virtual Ethereum wallet, in your browser";
const CONNECT_METAMASK = "🦊 Connect to Metamask using the top right button.";

const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            const obj = {
                status: CONNECTED,
                address: addressArray[0],
            };

            return obj;
        } catch (err) {
            return {
                address: "",
                status: "😥 " + (err as Error)?.message,
            };
        }
    } else {
        return {
            address: "",
            status: MUST_INSTALL_METAMASK
        };
    }
};

const useWalletConnection = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [walletStatus, setWalletStatus] = useState("");

    const configureWallet = async () => {
        if (window.ethereum) {
            try {
                const addressArray = await window.ethereum.request({
                    method: "eth_accounts",
                });

                if (addressArray.length > 0) {
                    setWalletAddress(addressArray[0]);
                    setWalletStatus(CONNECTED);
                } else {
                    setWalletAddress("");
                    setWalletStatus(CONNECT_METAMASK);
                }
            } catch (err) {
                setWalletAddress("");
                setWalletStatus("😥 " + (err as Error).message);
            }
        } else {
            setWalletAddress("");
            setWalletStatus(MUST_INSTALL_METAMASK);
        }
    }

    const walletChange = () => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (addressArray: any[]) => {
                if (addressArray.length > 0) {
                    setWalletAddress(addressArray[0]);
                    setWalletStatus(CONNECTED);
                } else {
                    setWalletAddress("");
                    setWalletStatus(CONNECT_METAMASK);
                }
            });
        } else {
            setWalletAddress("");
            setWalletStatus(MUST_INSTALL_METAMASK);
        }
    }

    useEffect(() => {
        configureWallet();
        walletChange();
    }, []);

    return { walletAddress, walletStatus };
};

export { connectWallet, useWalletConnection };