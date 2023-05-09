import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from '@rainbow-me/rainbowkit'
import NavBar from '@/components/NavBar'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  Chain,
} from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { SessionProvider } from 'next-auth/react'
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth'
import { WalletContextProvider } from '@/context/walletContext'
import theme from '@/styles/theme'

const { chains, provider } = configureChains(
  [mainnet, goerli],
  // [mainnet, polygon, optimism, arbitrum, goerli],
  [
    alchemyProvider({ apiKey: 'o13ZJRrEu85G8Zi9lb9KxaZhkv6537H7' }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

// src/pages/_app.tsx
export default function App({
  Component,
  pageProps: { session, backgroundImage, ...pageProps },
}: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ChakraProvider theme={theme} resetCSS={true}>
        <WalletContextProvider>
          <SessionProvider refetchInterval={0} session={session}>
            <RainbowKitSiweNextAuthProvider>
              <RainbowKitProvider
                chains={chains}
                theme={midnightTheme()}
                coolMode
                showRecentTransactions={true}>
                <Component {...pageProps} />
              </RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </SessionProvider>
        </WalletContextProvider>
      </ChakraProvider>
    </WagmiConfig>
  )
}
