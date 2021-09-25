import { useEffect, useState } from "react";

const CONNECTED = "😆 Connected";
const MUST_INSTALL_METAMASK = "You must install Metamask, a virtual Ethereum wallet, in your browser";
const CONNECT_METAMASK = "🦊 Connect to Metamask using the top right button.";

async function connectRequest(request: "eth_requestAccounts" | "eth_accounts") {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: request,
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
}

const useWalletConnection = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [walletStatus, setWalletStatus] = useState("");

    const connectWallet = async () => {
        return connectRequest("eth_requestAccounts");
    };

    const configureWallet = async () => {
        const { address, status } = await connectRequest("eth_accounts");
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

    useEffect(() => {
        configureWallet();
        onWalletChange();
    }, []);

    return { walletAddress, walletStatus, connectWallet };
};

export default useWalletConnection;

