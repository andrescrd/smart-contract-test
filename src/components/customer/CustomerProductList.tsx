import { List, ListItem, ListItemText } from "@material-ui/core";
import React, { useContext } from "react";
import useMarketContract from "../../hooks/market-contract";
import useWeb3 from "../../hooks/web3";
import WalletContext from "../../store/wallet.context";

const CustomerProductList: React.FC = () => {
    const { convertToEth } = useWeb3();
    const { walletAddress } = useContext(WalletContext);
    const { customerProducts } = useMarketContract(walletAddress);

    return (
        <>
             <List>
                {customerProducts.map((product, index) =>
                    <ListItem key={index}>
                        <ListItemText primary={product.name} secondary={`Cost: ${convertToEth(product.price)}`} />
                        {/* <Button variant="outlined" onClick={() => buyProductHandler(index, product)}>BUY</Button> */}
                    </ListItem>)}
            </List>          
        </>
    )
}

export default CustomerProductList;