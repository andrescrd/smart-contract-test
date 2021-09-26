import { useEffect, useState } from "react";
import MarketContract from "../components/contracts/MarketContract";
import MarketService from "../services/merket.service";

type Product = { name: string, price: number };

const useMarketContract = () => {
    const [total, setTotal] = useState<number>(0);
    const [products, setProducts] = useState<Array<Product>>([]);

    const loadTotal = async () => {
        const service = MarketService(await MarketContract(window.ethereum));
        const total = await service.getTotlaProducts();
        setTotal(total);
    }

    const loadProducts = async () => {
        const service = MarketService(await MarketContract(window.ethereum));
        const products = await service.getProducts();
        setProducts(products);
    }

    const buyProduct = async (index: number, account: string, price: number) => {
        const service = MarketService(await MarketContract(window.ethereum));
        await service.buyProduct(index, account, price);
    }

    useEffect(() => {
        loadTotal();
        loadProducts();
    }, [])

    return { total, products, buyProduct };
}

export default useMarketContract;