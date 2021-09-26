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
            <div>
                {customerProducts.map((product, index) =>
                    <div key={index}>
                        <span>{product.name} - Cost: {convertToEth(product.price)} </span>
                    </div>)}

            </div>
        </>
    )
}

export default CustomerProductList;