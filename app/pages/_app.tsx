import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { extendTheme, ChakraProvider, CSSReset } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import '@rainbow-me/rainbowkit/styles.css'
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
// import { ConnectButton } from "@rainbow-me/rainbowkit";

const apiKey = process.env.ALCHEMY_ID
import { SessionProvider } from 'next-auth/react'
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth'

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, goerli],
  [
    //alchemyProvider(apiKey !== undefined ? { apiKey } : { apiKey: '' }),
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

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'black',
        color: 'white',
      },
      //set homeBG.png as background image of the app
      '.bgImg': {
        backgroundImage: "url('/homeBg.png')",
        //backgroundImage: 'url("../public/homeBg.png")',
        backgroundSize: 'cover',
      },
      //set gameBG.png as background image of the app
      '.gameImg': {
        backgroundImage: "url('/game.png')",
        //backgroundImage: 'url("../public/homeBg.png")',
        backgroundSize: 'cover',
      },

      '.exyGranted': {
        backgroundImage: "url('/exyGranted.png')",
        backgroundSize: 'cover',
      },

      //set exy1.png as background image of a sample item page
      '.exyImg': {
        backgroundImage: "url('/exy1.jpg')",
        backgroundSize: 'cover',
      },
      //page padding
      '.pagePadding': {
        padding: '0 4vw',
      },
      //Big bold title used in homepage
      '.title': {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '900',
        fontSize: '6rem',
        lineHeight: '130px',
      },
      '.headingSm': {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '600',
        fontSize: '20px',
      },
      '.headingMd': {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '900',
        fontSize: '14px',
        lineHeight: '17px',
      },
      //Small light blue text used across the app
      '.blueTxt': {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '400',
        fontSize: '12px',
        color: '#7190FF',
      },
      '.blueTxtBold': {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '600',
        fontSize: '14px',
        color: '#7190FF',
      },
      //grey paragraph text used across the app
      '.txt': {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '400',
        lineHeight: '25px',
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.7)',
      },
      //This class used for display flex, column, align items center
      '.flexAlgnCenter': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
  },
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  //console.log('session on app', session)
  return (
    <WagmiConfig client={wagmiClient}>
      <ChakraProvider theme={theme} resetCSS={true}>
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
      </ChakraProvider>
    </WagmiConfig>
  )
}
