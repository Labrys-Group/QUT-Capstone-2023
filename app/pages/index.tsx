import React from "react";
import { useEffect } from "react";
import { Text, Box, Flex } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import NavBar from "@/components/NavBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function App() {
  const account = useAccount();
  const { data: session } = useSession();
  const router = useRouter();

  const status = account.status;

  useEffect(() => {
    const securePage = async () => {
      // check if authenticated and if is connected to wallet
      if (session && status === "connected") {
        console.log("session", session);
        router.push("/item");
      } else {
      }
    };
    securePage();
  }, [session, status]);

  return (
    <Flex h="100vh" flexDirection="column" className="bgImg">
      <Box h={{ base: "30%", lg: "20%" }}>
        <NavBar />
      </Box>
      <Flex
        h={{ base: "70%", lg: "80%" }}
        pt="2em"
        flexDirection="column"
        alignItems="center"
      >
        <Text className="blueTxt">WELCOME TO</Text>
        <Text className="title paddingTxt txtCenter">MEMBERS ONLY</Text>
        <Text className="txt paddingTxt txtCenter">
          Your gateway to exclusive content from your favourite brands &
          services.
        </Text>
        <Text className="txt paddingTxt txtCenter">
          All memberships secured as NFTs on the Ethereum blockchain.
        </Text>
        <Box className="flexAlgnCenter" mt="3em">
          <Text className="txt paddingTxt txtCenter" mb="1em">
            To get start first connect your wallet
          </Text>
          <ConnectButton />
        </Box>
      </Flex>
    </Flex>
  );
}
