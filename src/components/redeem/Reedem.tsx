import { Button } from "@material-ui/core";
import React from "react";
import useMarketContract from "../../hooks/market-contract";
import useWeb3 from "../../hooks/web3";

const Reedem: React.FC<{ walletAddress: string }> = ({ walletAddress }) => {
    const { convertToEth } = useWeb3();
    const { reedemEth, reedemLoyaltyPoint } = useMarketContract(walletAddress);

    const reedemLoyaltyPointHandler = async () => {
        await reedemLoyaltyPoint(walletAddress);
    }

    return (
        <>
            <h3>{`${convertToEth(reedemEth)} ETH`} </h3>
            <Button variant="outlined" onClick={reedemLoyaltyPointHandler}>Reedem</Button>
        </>
    )
}

export default Reedem;