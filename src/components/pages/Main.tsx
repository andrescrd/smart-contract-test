import React, { useEffect } from 'react';
import Header from '../header/Header';
import Panel from "../panel/Panel";

const Main = () => {
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