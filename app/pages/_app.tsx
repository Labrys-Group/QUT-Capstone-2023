import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { extendTheme, ChakraProvider, CSSReset } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
// import { ConnectButton } from "@rainbow-me/rainbowkit";

const apiKey = process.env.ALCHEMY_ID;
import { SessionProvider } from 'next-auth/react'
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth'

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, goerli],
  [
    alchemyProvider(apiKey !== undefined ? { apiKey } : { apiKey: "" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "black",
        color: "white",
      },
      //set homeBG.png as background image of the app
      ".bgImg": {
        backgroundImage: "url('/homeBg.png')",
        //backgroundImage: 'url("../public/homeBg.png")',
        backgroundSize: "cover",
      },
      //Big bold title used in homepage
      ".title": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "900",
        textAlign: "center",
        fontSize: "4.16vw",
      },
      //Small light blue text used across the app
      ".blueTxt": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "400",
        textAlign: "center",
        fontSize: "0.9vw",
        color: "#7190FF",
      },
      //grey paragraph text used across the app
      ".txt": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "400",
        textAlign: "center",
        lineHeight: "24px",
        fontSize: "0.7vw",
        color: "rgba(255, 255, 255, 0.7)",
      },
      //This class used for display flex, column, align items center
      ".flexAlgnCenter": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
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
  );
}
