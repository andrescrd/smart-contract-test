import React from "react";

const Header: React.FC<{ wallet: any, status: string, onConnect: () => void }> = ({ wallet, status, onConnect }) => {

    const connectWalletPressed = async () => {
        onConnect();
    }

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