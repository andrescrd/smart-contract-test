import React, { useContext } from 'react';
import WalletContext from '../../store/wallet.context';
import Balance from '../balance/Balance';
import Header from '../header/Header';
import Panel from "../panel/Panel";
import ProductList from '../products/ProductList';

const Main: React.FC<{}> = () => {
    const { walletAddress, walletStatus, connect } = useContext(WalletContext);
 
    return (
        <>
            <Header wallet={walletAddress} status={walletStatus} onConnect={connect}></Header>
            <br />
            <Panel title="Balance">
             {walletAddress && <Balance walletAddress={walletAddress}></Balance>}
              
            </Panel>
            <Panel title="Products">
                <ProductList></ProductList>
            </Panel>
            <Panel title="Panel 3"></Panel>
            <Panel title="Panel 4"></Panel>
        </>)
}

export default Main;