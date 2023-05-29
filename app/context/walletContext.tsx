import { ethers, providers, Contract } from 'ethers'
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'

declare let window: any

interface IWalletContext {
  accountAddress: string | undefined
  provider: providers.Web3Provider | undefined
  signer: ethers.providers.JsonRpcSigner | undefined
}

export const WalletContext = createContext<IWalletContext>({} as IWalletContext)

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [provider, setProvider] = useState<providers.Web3Provider | undefined>()
  const [signer, setSigner] = useState<
    ethers.providers.JsonRpcSigner | undefined
  >()
  const [accountAddress, setAccountAddress] = useState<string | undefined>()

  // set the wallet provider in state on load
  useEffect(() => {
    if (!window.ethereum) return
    const connectProvider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(connectProvider)
  }, [])

  // set signer on initial render
  useEffect(() => {
    if (!provider || !window.ethereum) return
    ;(async () => {
      const newSigner = provider.getSigner()
      console.log(newSigner)
      try {
        const newAddress = await newSigner.getAddress()
        setSigner(newSigner)
        setAccountAddress(newAddress)
      } catch (e: any) {
        console.log(e)
      }
    })()
  }, [provider])

  const values = useMemo(
    () => ({
      accountAddress,
      provider,
      signer,
    }),
    [accountAddress, provider, signer]
  )

  return (
    <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
  )
}
