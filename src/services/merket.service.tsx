import { IMarketContract } from "../components/contracts/MarketContract";

const MarketService = (contract: IMarketContract) => {
    const getTotlaProducts = async () => {
        const total = await contract.totalProducts();
        return parseInt(total.toString());
    }

    const getProducts = async () => {
        const total = await getTotlaProducts();
        let products: Array<{ name: string, price: number }> = [];

        for (let index = 0; index < total; index++) {
            const product = await contract.products(index);
            products = [...products, { name: product[0], price: parseFloat(product[1].toString()) }]
        }

        return products;
    }

    return { getTotlaProducts, getProducts };
}

export default MarketService;