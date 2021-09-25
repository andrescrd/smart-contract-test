const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const obj = {
                status: "😆 Connected",
                address: addressArray[0],
            };
            return obj;
        } catch (err) {
            return {
                address: "",
                status: "😥 " + (err as Error)?.message,
            };
        }
    } else {
        return {
            address: "",
            status: "You must install Metamask, a virtual Ethereum wallet, in your browser",
        };
    }
};

export default connectWallet;