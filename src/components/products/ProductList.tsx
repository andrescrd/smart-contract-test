import React, { useEffect, useState } from "react";
import MarketService from "../../services/merket.service";
import MarketContract from "../contracts/MarketContract";

const ProductList: React.FC = () => {
    const [total, setTotal] = useState<number>(0);

    const load = async () => {
        const service = MarketService(await MarketContract(window.ethereum));
        const total = await service.getTotlaProducts();
        await service.getProducts();
        setTotal(total);
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <>
            <h3>{total}</h3>
        </>
    )
}

export default ProductList;