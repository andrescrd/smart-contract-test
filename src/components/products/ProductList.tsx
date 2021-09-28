import { Button, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import useMarketContract from "../../hooks/market-contract";
import useWeb3 from "../../hooks/web3";

const ProductList: React.FC<{walletAddress: string}> = ({walletAddress}) => {
    const { convertToEth } = useWeb3();
    const { products, buyProduct } = useMarketContract();

    const buyProductHandler = async (index: number, product: { price: number; }) => {
        await buyProduct(index, walletAddress, product.price);   
    }

    return (
        <>
            <List>
                {products.map((product, index) =>
                    <ListItem key={index}>
                        <ListItemText primary={product.name} secondary={`Cost: ${convertToEth(product.price)}`} />
                        {walletAddress && <Button variant="outlined" onClick={() => buyProductHandler(index, product)}>BUY</Button>}
                    </ListItem>)}
            </List>
        </>
    )
}

export default ProductList;