import React, { useContext, useEffect, useState } from "react";
import WalletContext from "../../store/wallet.context";

const Header: React.FC<{}> = () => {

    const [wallet, setWallet] = useState("");
    const [status, setStatus] = useState("");

    const { walletAddress, walletStatus, connect } = useContext(WalletContext);

    const connectWalletPressed = async () => {
        connect();
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