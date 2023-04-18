import { ethers, providers, Contract } from "ethers";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import TokenABI from "../abi/token.json";
import { chain } from "../constants/chain";
import { contractAddresses } from "../constants/contracts";
import getTokenBalance from "../helpers/getTokenBalance";
import getTotalSupply from "../helpers/getTotalSupply";

declare let window: any;

interface IWalletContext {
  onConnect: () => void;
  currentAccount: string | undefined;
  chainId: number | undefined;
  balance: number | undefined;
  isCorrectNetwork: boolean | undefined;
  provider: providers.Web3Provider | undefined;
  signer: ethers.providers.JsonRpcSigner | undefined;
  erc721: ethers.Contract | undefined;
  isConnected: boolean | undefined;
  totalSupply: number | undefined;
}

export const WalletContext = createContext<IWalletContext>(
  {} as IWalletContext
);

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [provider, setProvider] = useState<
    providers.Web3Provider | undefined
  >();
  const [signer, setSigner] = useState<
    ethers.providers.JsonRpcSigner | undefined
  >();
  const [chainId, setChainId] = useState<number | undefined>();
  const [erc721, seterc721] = useState<ethers.Contract | undefined>();

  const [currentAccount, setCurrentAccount] = useState<string | undefined>();
  const [balance, setBalance] = useState<number | undefined>();
  const [totalSupply, setTotalSupply] = useState<number | undefined>();
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean | undefined>(
    false
  );
  const [isConnected, setIsConnected] = useState<boolean | undefined>(false);

  // handles state for wallet connection returning a boolean based on connection status
  const handleIsWalletConnected = useCallback(async () => {
    if (!provider) return;
    const accounts = await provider.listAccounts()
    if (accounts.length !== 0) {
      setIsConnected(true);
    }
  }, [provider]);

  // Reloads page upon change of user account in wallet
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
    handleIsWalletConnected();
  }, [handleIsWalletConnected]);

  // This useEffect sets the wallet provider in state on load
  useEffect(() => {
    if (!window.ethereum) return;
    const connectProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(connectProvider);
  }, []);

  // Sets signer and currentAccount on initial render
  useEffect(() => {
    if (!provider || !window.ethereum) return;
    (async () => {
      const newSigner = provider.getSigner();
      try {
        const newAddress = await newSigner.getAddress();
        setSigner(newSigner);
        setCurrentAccount(newAddress);
      } catch (error: any) {
        console.log(error)
      }
    })();
  }, [provider]);

  // Sets erc721 contract in state
  useEffect(() => {
    if (!provider) return;
    const newerc721 = new Contract(
      contractAddresses[0].address,
      TokenABI.abi,
      provider
    );
    seterc721(newerc721);
  }, [provider]);

  // Gets the network of connected provider and checks if it is the correct network
  useEffect(() => {
    const getConnectedNetwork = async () => {
      if (!provider) return;
      try {
        const network = await provider.getNetwork();
        setChainId(network.chainId);
      } catch (error: any) {
        console.log(error.message)
      }

      if (chainId === chain[0].chainID) {
        setIsCorrectNetwork(true);
      }
    };
    getConnectedNetwork();
  }, [chainId, provider]);

  // Returns amount of MTC in user wallet. Listens for any changes to balance
  useEffect(() => {
    if (!provider || !erc721 || !currentAccount) return;
    const queryTokenBalance = async () => {
      try {
        setBalance(await getTokenBalance(erc721, currentAccount));
      } catch (error: any) {
        console.log(error.message)
      }
    };
    provider.on("block", queryTokenBalance);
    queryTokenBalance();
  }, [currentAccount, erc721, provider, balance]);

  // Sets total supply of MTC in faucet and listens for changes to the balance
  useEffect(() => {
    if (!provider || !erc721) return;
    const queryTotalSupply = async () => {
      try {
        setTotalSupply(await getTotalSupply(erc721));
      } catch (error: any) {
        console.log(error.message)
      }
    };
    provider.on("block", queryTotalSupply);
    queryTotalSupply();
  }, [erc721, provider]);

  // Function that handles the connection of metamask account
  const onConnect = useCallback(() => {
    const connectCallback = async () => {
      if (!provider) return;

      try {
        const userAccount = await provider.send("eth_requestAccounts", []);
        if (userAccount.length > 0) {
          setCurrentAccount(userAccount[0]);
          console.log('success')
        }
      } catch (error: any) {
        console.log(error.message)
      }
    };
    connectCallback();
  }, [provider]);

  const values = useMemo(
    () => ({
      currentAccount,
      chainId,
      balance,
      isCorrectNetwork,
      provider,
      onConnect,
      signer,
      erc721,
      isConnected,
      totalSupply,
    }),
    [
      balance,
      chainId,
      currentAccount,
      erc721,
      isConnected,
      isCorrectNetwork,
      onConnect,
      provider,
      signer,
      totalSupply,
    ]
  );

  return (
    <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
  );
};
