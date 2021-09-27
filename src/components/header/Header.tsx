import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";

const Header: React.FC<{ wallet: any, status: string, onConnect: () => void }> = ({ wallet, status, onConnect }) => {

    const connectWalletPressed = async () => {
        onConnect();
    }

    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    🧙‍♂️ Test
                </Typography>
                <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                    {status}
                </Typography>
                <Button color="inherit" variant="outlined" onClick={connectWalletPressed}>
                    {wallet?.length > 0 ? (
                        "Connected: " +
                        String(wallet).substring(0, 6) +
                        "..." +
                        String(wallet).substring(38)
                    ) : (
                        <span>Connect Wallet</span>
                    )}
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;