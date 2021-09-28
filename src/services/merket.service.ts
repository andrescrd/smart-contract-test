import { IMarketContract } from "../components/contracts/MarketContract";

const MarketService = (truffleContract: IMarketContract) => {
    const productPurchasedEvent = (): Promise<[string, string]> => {
        return new Promise((resolve, rejected) => {
            truffleContract.contract.events.ProductPurchased(null, (err: any, event: { returnValues: [string, string]; }) => {
                if (err) {
                    rejected(err);
                } else {
                    resolve(event.returnValues);
                }
            });
        });
    }

    const getTotlaProducts = async () => {
        const total = await truffleContract.totalProducts();
        return parseInt(total.toString());
    }

    const getProducts = async () => {
        const total = await getTotlaProducts();
        let products: Array<{ name: string, price: number }> = [];

        for (let index = 0; index < total; index++) {
            const product = await truffleContract.products(index);
            products = [...products, { name: product[0], price: parseFloat(product[1].toString()) }]
        }

        return products;
    }

    const reedemLoyaltyPoint = async (account: string) => {
        await truffleContract.reedemLoyaltyPoint({ from: account });
    }

    const buyProduct = async (index: number, account: string, price: number) => {
        await truffleContract.buyProduct(index, { from: account, value: price });
    }

    const getRefundableEther = async (account: string) => {
        const total = await truffleContract.getRefundableEther({ from: account });
        return parseFloat(total.toString());
    }

    const getCustomerProduct = async (account: string) => {
        const total = await getCustomerTotalProducts(account);
        let products: Array<{ name: string, price: number }> = [];

        for (let index = 0; index < total; index++) {
            const product = await truffleContract.customerProducts(account, index);
            products = [...products, { name: product[0], price: parseFloat(product[1].toString()) }]
        }

        return products;
    }

    const getCustomerTotalProducts = async (account: string) => {
        const total = await truffleContract.customerTotalProducts(account);
        return parseInt(total.toString());
    }

    return {
        getTotlaProducts, getProducts, buyProduct, getCustomerTotalProducts,
        getCustomerProduct, getRefundableEther, reedemLoyaltyPoint, productPurchasedEvent
    };
}

export default MarketService;