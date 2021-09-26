import React, { useEffect } from 'react';
import MarketContract from '../contracts/MarketContract';
import Header from '../header/Header';
import Panel from "../panel/Panel";

const Main = () => {


    useEffect(()=>{

        MarketContract(window.ethereum).then(market=>{
            console.log(market);
        }).catch(e=>alert(e));
    }, []);

    return (<>
        <Header></Header>
        <br />
        <Panel title="Panel 1">

        </Panel>
        <Panel title="Panel 2"></Panel>
        <Panel title="Panel 3"></Panel>
        <Panel title="Panel 4"></Panel>
    </>)
}

export default Main;