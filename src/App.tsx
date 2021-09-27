import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import './App.css';
import MarketContract from './components/contracts/MarketContract';
import Main from './components/pages/Main';
import { WalletContextProvider } from './store/wallet.context';

function App() {
  useEffect(() => {
    MarketContract(window.ethereum).then(market => {
      console.log(market);
    }).catch(e => alert(e));
  }, []);


  return (
    <WalletContextProvider>
      <Container maxWidth="md">
        <Main></Main>
        </Container>
    </WalletContextProvider>
  );
}

export default App;
