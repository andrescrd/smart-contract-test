import React from "react";
import useMarketContract from "../../hooks/market-contract";
import useWeb3 from "../../hooks/web3";

const ProductList: React.FC = () => {
    const { convertToEth } = useWeb3();
    const { total, products } = useMarketContract();

    return (
        <>
            <h3>Total: {total}</h3>
            <div>
                {products.map((product, index) =>
                    <div key={index}>
                        <span>{product.name} - Cost: {convertToEth(product.price)}</span>
                    </div>)}

            </div>
        </>
    )
}

export default ProductList;