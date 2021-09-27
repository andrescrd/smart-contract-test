import { Button, Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader } from "@material-ui/core";
import React, { useContext } from "react";
import useMarketContract from "../../hooks/market-contract";
import useWeb3 from "../../hooks/web3";
import WalletContext from "../../store/wallet.context";

const ProductList: React.FC = () => {
    const { convertToEth } = useWeb3();
    const { total, products, buyProduct } = useMarketContract();
    const { walletAddress } = useContext(WalletContext);


    const buyProductHandler = (index: number, product: { price: number; }) => {
        buyProduct(index, walletAddress, product.price)
    }

    return (
        <>
            <List>
                {products.map((product, index) =>
                    <ListItem key={index}>
                        <ListItemText primary={product.name} secondary={`Cost: ${convertToEth(product.price)}`} />
                        <Button variant="outlined" onClick={() => buyProductHandler(index, product)}>BUY</Button>
                    </ListItem>)}
            </List>
        </>
    )
}

export default ProductList;