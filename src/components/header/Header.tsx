import React, { useEffect, useState } from "react"
import useWalletConnection from "../../hooks/wallet-connect";

const Header: React.FC<{}> = () => {

    const [wallet, setWallet] = useState("");
    const [status, setStatus] = useState("");

    const { walletAddress, walletStatus, connectWallet } = useWalletConnection();

    const connectWalletPressed = async () => {
        var { address, status } = await connectWallet();
        setWallet(address);
        setStatus(status);
    }

    useEffect(() => {
        setWallet(walletAddress);
        setStatus(walletStatus);
    }, [walletAddress, walletStatus])

    return (
        <div>
            <h1>🧙‍♂️ Test</h1>
            <button onClick={connectWalletPressed}>
                {wallet?.length > 0 ? (
                    "Connected: " +
                    String(wallet).substring(0, 6) +
                    "..." +
                    String(wallet).substring(38)
                ) : (
                    <span>Connect Wallet</span>
                )}
            </button>
            <br></br>
            <p >
                {status}
            </p>
        </div>
    );
}

export default Header;