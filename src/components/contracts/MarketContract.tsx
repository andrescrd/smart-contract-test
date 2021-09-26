import MarketContractJSON from '../../contracts/Market.json';
import * as TruffleContract from 'truffle-contract';

export interface IMarketContract {
    products: (index: number) => Promise<[string,number]>;
    totalProducts:  () => Promise<number>;
}

const MarketContract = async (provider: any) => {
    const market = TruffleContract(MarketContractJSON);
    market.setProvider(provider);
    return (await market.deployed()) as IMarketContract;
}

export default MarketContract;