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

    const reedemLoyaltyPoint = async (account: string) => {
        await contract.reedemLoyaltyPoint({from: account});
    }

    const buyProduct = async (index: number, account: string, price: number) => {
        await contract.buyProduct(index, { from: account, value: price });
    }

    const getRefundableEther = async (account: string) => {
        const total = await contract.getRefundableEther({from: account});
        return parseFloat(total.toString());
    }

    const getCustomerProduct = async (account: string) => {
        const total = await getCustomerTotalProducts(account);
        let products: Array<{ name: string, price: number }> = [];

        for (let index = 0; index < total; index++) {
            const product = await contract.customerProducts(account, index);
            products = [...products, { name: product[0], price: parseFloat(product[1].toString()) }]
        }

        return products;
    }

    const getCustomerTotalProducts = async (account: string) => {
        const total = await contract.customerTotalProducts(account);
        return parseInt(total.toString());
    }

    return { getTotlaProducts, getProducts, buyProduct, getCustomerTotalProducts, getCustomerProduct, getRefundableEther, reedemLoyaltyPoint };
}

export default MarketService;