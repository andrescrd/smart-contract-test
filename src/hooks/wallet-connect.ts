import { useEffect, useState } from "react";

const CONNECTED = "😆 Connected";
const MUST_INSTALL_METAMASK = "You must install Metamask, a virtual Ethereum wallet, in your browser";
const CONNECT_METAMASK = "🦊 Connect to Metamask using the top right button.";

async function requestConnection(request: "eth_requestAccounts" | "eth_accounts") {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: request,
            });

            let obj = {
                address: addressArray[0],
                status: addressArray[0] ? CONNECTED : CONNECT_METAMASK
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
}

const useWalletConnection = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [walletStatus, setWalletStatus] = useState("");

    const connectWallet = async () => {
        return requestConnection("eth_requestAccounts");
    };

    const configureWallet = async () => {
        const { address, status } = await requestConnection("eth_accounts");
        setWalletAddress(address);
        setWalletStatus(status);
    }

    const onWalletChange = () => {
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

    const onWalletDisconnect = () => {
        if (window.ethereum) {
            window.ethereum.on('disconnect', () => {
                setWalletAddress("");
                setWalletStatus(CONNECT_METAMASK);
            });
        } else {
            setWalletAddress("");
            setWalletStatus(MUST_INSTALL_METAMASK);
        }
    }

    useEffect(() => {
        configureWallet();
        onWalletChange();
        onWalletDisconnect();
    }, []);

    return { walletAddress, walletStatus, connectWallet };
};

export default useWalletConnection;

