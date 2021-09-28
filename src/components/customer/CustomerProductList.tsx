import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import useMarketContract from "../../hooks/market-contract";
import useWeb3 from "../../hooks/web3";

const CustomerProductList: React.FC<{walletAddress: string}> = ({walletAddress}) => {
    const { convertToEth } = useWeb3();
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