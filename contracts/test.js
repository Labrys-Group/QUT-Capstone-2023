// In your JS module file
const xhr = new XMLHttpRequest();
xhr.open("GET", "./deployments/goerli/AccessTicket.json");
xhr.responseType = "json";
xhr.onload = () => {
  const obj = xhr.response;
  const button_mint = document.getElementById("mint");
  const button_withdraw = document.getElementById("withdraw");
  const address = obj.address;
  const abi = obj.abi;
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, address);
  // Try to access the Web3 object
  if (typeof Web3 !== "undefined") {
    console.log("Web3.js is loaded");
  } else {
    console.log("Web3.js is not loaded");
  }

  // Check if there are any connected accounts
  web3.eth.getAccounts((error, accounts) => {
    if (error) {
      console.error(error);
    } else if (accounts.length === 0) {
      console.log("No accounts connected");
    } else {
      console.log(`Connected to account: ${accounts[0]}`);
    }
  });

  web3.eth.net.getId((err, netId) => {
    switch (netId) {
      case 5:
        console.log("Connected to Goerli test network");
        break;
      default:
        console.log("Not connected to Goerli test network");
    }
  });

  button_mint.onclick = async () => {
    console.log(address);
    console.log(abi);
    web3.eth.getAccounts().then(async (accounts) => {
      const account = accounts[0];
      const value = web3.utils.toWei("0.000000000000001", "ether");
      console.log(`Connected to account: ${account}`);
      contract.methods
        .mint()
        .send({ from: account, value: value })
        .then((result) => {
          console.log("Transaction successful:", result);
        })
        .catch((error) => {
          console.error("Transaction failed:", error);
        });
    });
  };

  button_withdraw.onclick = async () => {
    web3.eth.getAccounts().then(async (accounts) => {
      const account = accounts[0];
      contract.methods
        .withdrawFunds()
        .send({ from: account })
        .then((result) => {
          console.log("Transaction successful:", result);
        })
        .catch((error) => {
          console.error("Transaction failed:", error);
        });
    });
  };
};
xhr.send();
