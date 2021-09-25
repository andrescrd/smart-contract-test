import React, { useEffect, useState } from "react"
import connectWallet from "../../utils/connect-wallet";
const Header: React.FC<{}> = () => {

    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");

    const connectWalletPressed = async () => {
        var { address, status } = await connectWallet();
        setWallet(address);
        setStatus(status);
    }

    useEffect(() => {

    }, []);

    return (
        <div>
            <button onClick={connectWalletPressed}>
                {walletAddress.length > 0 ? (
                    "Connected: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
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