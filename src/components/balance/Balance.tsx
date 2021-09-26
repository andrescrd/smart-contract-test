import React, { useEffect, useState } from "react";
import useWeb3 from "../../hooks/web3";

const Balance: React.FC<{ walletAddress: string }> = ({ walletAddress }) => {
    const [balance, setBalance] = useState('');

    const { web3, loaded, convertToEth } = useWeb3();

    const getBalance = async (currentAddress: string) => {
        try {
            if (web3) {
                const weiBalance = await web3.eth.getBalance(currentAddress);
                const balanceEth = weiBalance ? convertToEth(weiBalance)! : '';
                setBalance(balanceEth);
            }
        } catch (error) {
            setBalance('');
        }
    };

    useEffect(() => {
        getBalance(walletAddress);
    }, [walletAddress, loaded]);

    return (
        <>
            <p><strong>{walletAddress}</strong></p>
            <span><strong>Balance: </strong>{balance}</span>
        </>
    )
}

export default Balance;