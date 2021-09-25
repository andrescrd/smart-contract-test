import Web3 from 'web3';

const getWeb3 = () => {
    return new Promise((resolve, reject) => {
        window.addEventListener('load', async function () {

            // Modern dapp browsers...
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);

                try {
                    // Request account access if needed
                    await window.ethereum.enable();

                    resolve(window.web3);
                } catch (error) {
                    reject('User denied account access');
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                resolve(window.web3);
            }
            // Non-dapp browsers...
            else {
                reject('Non-Ethereum browser detected. You should consider trying MetaMask!');
            }
        });
    });
}

export default getWeb3;