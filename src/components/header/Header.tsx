import React, { useEffect, useState } from "react"
import { connectWallet, useWalletConnection } from "../../utils/connect-wallet";

const Header: React.FC<{}> = () => {

    const [wallet, setWallet] = useState("");
    const [status, setStatus] = useState("");

    const { walletAddress, walletStatus } = useWalletConnection();

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
            <button onClick={connectWalletPressed}>
                {wallet.length > 0 ? (
                    "Connected: " +
                    String(wallet).substring(0, 6) +
                    "..." +
                    String(wallet).substring(38)
                ) : (
                    <span>Connect Wallet</span>
                )}
            </button>
            <br></br>
            <h1>🧙‍♂️ Test</h1>
            <p >
                {status}
            </p>
        </div>
    );
}

export default Header;