import { useEffect, useState } from "react";
import MarketContract from "../components/contracts/MarketContract";
import MarketService from "../services/merket.service";

type Product = { name: string, price: number };

const useMarketContract = (account?: string) => {
    const [total, setTotal] = useState<number>(0);
    const [reedemEth, setReedemEth] = useState<number>(0);
    const [products, setProducts] = useState<Array<Product>>([]);
    const [customerProducts, setCustomerProduct] = useState<Array<Product>>([]);

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

    const reedemLoyaltyPoint = async (account: string) => {
        const service = MarketService(await MarketContract(window.ethereum));
        await service.reedemLoyaltyPoint(account);
    }

    const loadCustomerProduct = async (account: string) => {
        const service = MarketService(await MarketContract(window.ethereum));
        const products = await service.getCustomerProduct(account);
        setCustomerProduct(products);
    }

    const loadRefundableEther = async (account: string) => {
        const service = MarketService(await MarketContract(window.ethereum));
        const eth = await service.getRefundableEther(account);
        setReedemEth(eth);
    }

    useEffect(() => {
        loadTotal();
        loadProducts();
    }, [])

    useEffect(() => {
        if (account) {
            loadCustomerProduct(account);
            loadRefundableEther(account);
        }
    }, [account])

    return { total, products, customerProducts, reedemEth, buyProduct, reedemLoyaltyPoint };
}

export default useMarketContract;