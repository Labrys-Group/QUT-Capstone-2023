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
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  Chain,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { SessionProvider } from "next-auth/react";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { WalletContextProvider } from "@/context/walletContext";

const { chains, provider } = configureChains(
  [mainnet, goerli],
  // [mainnet, polygon, optimism, arbitrum, goerli],
  [
    alchemyProvider({ apiKey: "o13ZJRrEu85G8Zi9lb9KxaZhkv6537H7" }),
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
        backgroundSize: "cover",
      },
      //set gameBG.png as background image of the app
      ".gameImg": {
        backgroundImage: "url('/game.png')",
        backgroundSize: "cover",
      },

      ".exyGranted": {
        backgroundImage: "url('/exyGranted.png')",
        backgroundSize: "cover",
      },

      //set exy1.png as background image of a sample item page
      ".exyImg": {
        backgroundImage: "url('/exy1.jpg')",
        backgroundSize: "cover",
      },
      //page padding
      ".pagePadding": {
        padding: "0 4vw",
      },
      ".contentPagePadding": {
        padding: "0 3.5vw",
      },
      //Big bold title used in homepage
      ".title": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "900",
        fontSize: "6rem",
        lineHeight: "130px",
      },
      ".headingSm": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "600",
        fontSize: "20px",
      },
      ".headingMd": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "900",
        fontSize: "14px",
        lineHeight: "17px",
      },
      //Small light blue text used across the app
      ".blueTxt": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "400",
        fontSize: "12px",
        color: "#7190FF",
      },
      ".blueTxtBold": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "600",
        fontSize: "14px",
        color: "#7190FF",
      },
      //grey paragraph text used across the app
      ".txt": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "400",
        lineHeight: "25px",
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.7)",
      },
      //This class used for display flex, column, align items center
      ".flexAlgnCenter": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      ".slick-slider": {
        top: "50px",
        display: "flex",
        alignItems: "center",
      },
      ".slick-next": {
        right: "0px",
      },
      ".slick-prev:before, .slick-next:before": {
        display: "none",
      },
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  //console.log('session on app', session)
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
                showRecentTransactions={true}
              >
                <Component {...pageProps} />
              </RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </SessionProvider>
        </WalletContextProvider>
      </ChakraProvider>
    </WagmiConfig>
  );
}
