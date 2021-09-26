import { IMarketContract } from "../components/contracts/MarketContract";

const MarketService = (contract: IMarketContract) => {
    const getTotlaProducts = async () => {
        const total = await contract.totalProducts();
        return parseInt(total.toString());
    }

    const getProducts = async () => {
        const total = await getTotlaProducts();
        const products = [];

        for (let index = 0; index < total; index++) {
            const x= await contract.products(index);
            console.log(x)
            // products.push({ name, price: Number(price) });
        }

        return [];
    }

    return {getTotlaProducts, getProducts};
}

export default MarketService;