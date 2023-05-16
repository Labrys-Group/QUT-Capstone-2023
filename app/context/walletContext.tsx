import { ethers, providers, Contract } from 'ethers'
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { abi, address } from '../constants/AccessTicket'
import { AccessTicket } from '@/constants/typechain-types'

declare let window: any

interface IWalletContext {
  accountAddress: string | undefined
  balance: number | undefined
  provider: providers.Web3Provider | undefined
  signer: ethers.providers.JsonRpcSigner | undefined
  erc721: ethers.Contract | undefined
  totalSupply: number | undefined
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

  const [erc721, setErc721] = useState<AccessTicket | undefined>()
  const [accountAddress, setAccountAddress] = useState<string | undefined>()

  //@TODO: implement
  const [balance, setBalance] = useState<number | undefined>()
  const [totalSupply, setTotalSupply] = useState<number | undefined>()

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

  // set ERC721 contract
  useEffect(() => {
    try {
      if (!provider) return
      const contract = new Contract(address, abi, signer) as AccessTicket
      setErc721(contract)
    } catch (e: any) {
      console.log(e)
    }
  }, [address, abi, signer, provider])

  // set balance
  useEffect(() => {
    if (!provider) return
    ;(async () => {
      try {
        if (accountAddress === undefined) {
          setBalance(undefined)
        } else {
          if (erc721 !== undefined) {
            const balance = await erc721.balanceOf(accountAddress)
            console.log(balance.toNumber())
            setBalance(balance?.toNumber())
          }
        }
      } catch (e: any) {
        console.log(e)
      }
    })()
  }, [accountAddress, erc721])

  const values = useMemo(
    () => ({
      accountAddress,
      balance,
      provider,
      signer,
      erc721,
      totalSupply,
    }),
    [balance, accountAddress, erc721, provider, signer, totalSupply]
  )

  return (
    <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
  )
}
