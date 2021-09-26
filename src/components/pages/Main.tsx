import React, { useEffect } from 'react';
import { WalletContextProvider } from '../../store/wallet.context';
import MarketContract from '../contracts/MarketContract';
import Header from '../header/Header';
import Panel from "../panel/Panel";

const Main = () => {

    useEffect(() => {
        MarketContract(window.ethereum).then(market => {
            console.log(market);
        }).catch(e => alert(e));
    }, []);

    return (
        <WalletContextProvider>
            <>
                <Header></Header>
                <br />
                <Panel title="Balance">

                </Panel>
                <Panel title="Panel 2"></Panel>
                <Panel title="Panel 3"></Panel>
                <Panel title="Panel 4"></Panel>
            </>
        </WalletContextProvider>)
}

export default Main;