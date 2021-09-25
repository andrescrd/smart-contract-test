import React, { useEffect } from 'react';
import getWeb3 from '../../getWeb3';
import Header from '../header/Header';
import Panel from "../panel/Panel";

const Main = () => {

    useEffect(()=>{
        getWeb3().then((web3: any)=>{
            console.log(web3.version);
        }).catch(e=>alert(e));

    },[]);

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