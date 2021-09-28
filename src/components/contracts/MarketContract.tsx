import MarketContractJSON from '../../contracts/Market.json';
import * as TruffleContract from 'truffle-contract';

export interface IMarketContract {
    contract: {
        events: {
            ProductPurchased: (params: any, callback: (err: any, event: { returnValues: [string, string] }) => void) => void;
        }
    };
    products: (index: number) => Promise<[string, number]>;
    totalProducts: () => Promise<number>;
    buyProduct: (index: number, data: { from: string, value: number }) => Promise<void>;

    customerProducts: (address: string, index: number) => Promise<[string, number]>;
    customerTotalProducts: (address: string) => Promise<number>;

    getRefundableEther: (data: { from: string }) => Promise<number>;
    reedemLoyaltyPoint: (data: { from: string }) => Promise<void>;
}

const MarketContract = async (provider: any) => {
    const market = TruffleContract(MarketContractJSON);
    market.setProvider(provider);
    return (await market.deployed()) as IMarketContract;
}

export default MarketContract;