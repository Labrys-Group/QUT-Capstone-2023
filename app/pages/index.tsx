import React from "react";
import {
  Heading,
  Stack,
  Text,
  Center,
  Box,
  Image,
  BoxProps,
  HeadingProps,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import PrimaryButton from "@/components/PrimaryButton";
import TitleComponent from "@/components/TitleComponent";
import { RainbowButton } from "@/components/RainbowButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import ethers from "ethers";

interface MyBoxProps extends BoxProps {
  // add any additional props specific to your component
}

export const MyBox: React.FC<MyBoxProps> = (props) => {
  return <Box {...props} />;
};

export default function App() {
  const { address } = useAccount();

  async function getTokensFromMetaMask() {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );
    const walletAddress: string = "0xe5CA461cF9FF63143dE899d1Af8AE112eF6850CA";

    const logs = await provider.getLogs({
      fromBlock: 0,
      toBlock: "latest",
      address: walletAddress,
    });

    const tokenAddresses: string[] = logs
      .map((log: ethers.providers.Log) => ethers.utils.getAddress(log.address))
      .filter((address: string) => address !== walletAddress);

    console.log(tokenAddresses);
  }

  getTokensFromMetaMask();

  return (
    <MyBox>
      <MyBox display="flex">
        <MyBox display="flex" width="30%" alignItems="stretch">
          <Image src="https://i.ibb.co/cYs5dR4/Members-Only-Clear.png" />
        </MyBox>
        <Box mr="auto" />
        <ConnectButton />
      </MyBox>
      <MyBox>
        <Heading>WELCOME TO</Heading>
        <Heading
          fontWeight="bold"
          textAlign="center"
          color="whiteAlpha.900"
          size="2xl"
        >
          MEMBERS ONLY
        </Heading>

        {/* {address && <Text>My address is {address}</Text>} */}
        <Text color="whiteAlpha.800" textAlign="center">
          Your gateway to exclusive content from your favourite brands &
          services.
        </Text>
        <Text color="whiteAlpha.800" textAlign="center">
          All memberships secured as NFTs on the Ethereum blockchain.
        </Text>
        <Text color="whiteAlpha.800" textAlign="center">
          To get started, first connect your wallet
        </Text>
      </MyBox>
      <Center border={0} borderRadius={0} opacity={1}>
        <MyBox width="45%" />
        <ConnectButton />
        <MyBox width="45%" />
      </Center>
    </MyBox>
  );
}
