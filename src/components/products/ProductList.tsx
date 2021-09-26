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
            <h3>Total: {total}</h3>
            <div>
                {products.map((product, index) =>
                    <div key={index}>
                        <span>{product.name} - Cost: {convertToEth(product.price)} </span>
                        <button onClick={() => buyProductHandler(index, product)}>Buy</button>
                    </div>)}

            </div>
        </>
    )
}

export default ProductList;