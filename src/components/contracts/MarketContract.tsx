import MarketContractJSON from '../../contracts/Market.json';
import * as TruffleContract from 'truffle-contract';

const MarketContract = async (provider: any) => {
    const market = TruffleContract(MarketContractJSON);
    market.setProvider(provider);
    return await market.deployed();
}

export default MarketContract;