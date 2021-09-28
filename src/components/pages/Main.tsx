import { Grid, Stack } from '@material-ui/core';
import React, { useContext } from 'react';
import useMarketContract from '../../hooks/market-contract';
import WalletContext from '../../store/wallet.context';
import Balance from '../balance/Balance';
import CustomerProductList from '../customer/CustomerProductList';
import Header from '../header/Header';
import Panel from "../panel/Panel";
import ProductList from '../products/ProductList';
import Reedem from '../redeem/Reedem';

const Main: React.FC<{}> = () => {
    const { walletAddress, walletStatus, connect } = useContext(WalletContext);
    const { total } = useMarketContract();

    return (
        <>
            <Header wallet={walletAddress} status={walletStatus} onConnect={connect}></Header>

            <Grid container spacing={2} marginTop={10}>
                <Grid item xs={9}>
                    {walletAddress && <Panel title="Balance" >
                        <Balance walletAddress={walletAddress}></Balance>
                    </Panel>}
                </Grid>
                <Grid item xs={3}>
                    {walletAddress && <Panel>
                        <Reedem walletAddress={walletAddress}></Reedem>
                    </Panel>}
                </Grid>
                <Grid item xs={walletAddress ? 9 : 12}>
                    <Panel title={`Products (${total})`}>
                        <ProductList walletAddress={walletAddress}></ProductList>
                    </Panel>
                </Grid>
                <Grid item xs={3}>
                    {walletAddress && <Panel title="My Products">
                        <CustomerProductList walletAddress={walletAddress}></CustomerProductList>
                    </Panel>}
                </Grid>
            </Grid>
        </>)
}

export default Main;