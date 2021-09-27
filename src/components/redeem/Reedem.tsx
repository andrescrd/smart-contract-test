import { Button, Chip, Divider, Stack } from "@material-ui/core";
import React, { useContext } from "react";
import useMarketContract from "../../hooks/market-contract";
import useWeb3 from "../../hooks/web3";
import WalletContext from "../../store/wallet.context";

const Reedem: React.FC = () => {
    const { convertToEth } = useWeb3();
    const { walletAddress } = useContext(WalletContext);
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