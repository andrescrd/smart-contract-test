import { useEffect, useState } from "react";
import Web3 from "web3";

const useWeb3 = () => {
    const [web3, setWeb3] = useState<Web3>();
    const [loaded, setLoaded] = useState(false);

    const convertToEth = (value: number | string) => web3?.utils.fromWei(value.toString(), 'ether')

    useEffect(() => {
        if (window.ethereum && !loaded) {
            const web3 = new Web3(window.ethereum)
            setWeb3(web3);
            setLoaded(true);
        }
    }, [loaded]);

    return { web3, loaded, convertToEth };
};

export default useWeb3;