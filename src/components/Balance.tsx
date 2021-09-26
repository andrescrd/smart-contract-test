import React, { useEffect, useState } from "react";
import useWeb3 from "../hooks/web3";

const Balance: React.FC<{ walletAddress: string }> = ({ walletAddress }) => {
    const [balance, setBalance] = useState('');

    const { web3 } = useWeb3();

    const getBalance = async (currentAddress: string) => {
        try {
            const weiBalance = await web3?.eth.getBalance(currentAddress);
            const balanceEth = weiBalance ? web3?.utils.fromWei(weiBalance.toString(), 'ether')! : '';
            setBalance(balanceEth);
        } catch (error) {
            setBalance('');
        }
    };

    useEffect(() => {
        getBalance(walletAddress);
    }, [walletAddress]);

    return (
        <>
            <p><strong>{walletAddress}</strong></p>
            <span><strong>Balance: </strong>{balance}</span>
        </>
    )
}

export default Balance;