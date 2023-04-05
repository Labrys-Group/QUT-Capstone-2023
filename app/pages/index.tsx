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
import { NavBarProps } from "@/components/NavBar";
import ethers from "ethers";

interface MyBoxProps extends BoxProps {
  // add any additional props specific to your component
}

export const MyBox: React.FC<MyBoxProps> = (props) => {
  return <Box {...props} />;
};

// export type ConnectInformationComponentProps = {
//   connected: boolean;
// };

// function ConnectInformationComponent({
//   connected,
// }: ConnectInformationComponentProps) {
//   if (!connected)
//     return (
//       <>
//         <Text className="txt">To get started, first connect your wallet</Text>
//         <ConnectButton />
//       </>
//     );
//   else return <Text className="txt">You have connected to your wallet</Text>;
// }
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function App() {
  const { address } = useAccount()
  const { data: session } = useSession()
  const isConnected = address !== undefined;

  return (
    //
    <MyBox h="100vh" className="bgImg">
      <NavBarProps />

      <MyBox h="30vh" mt="10vh">
        <Text className="blueTxt">WELCOME TO</Text>
        <Text className="title">MEMBERS ONLY</Text>
        <Text className="txt">
          Your gateway to exclusive content from your favourite brands &
          services.
        </Text>
        <Text className="txt">
          All memberships secured as NFTs on the Ethereum blockchain.
        </Text>
      </MyBox>
      <MyBox className="flexAlgnCenter">
        <ConnectButton />
        {/* <ConnectInformationComponent connected={isConnected} /> */}
      </MyBox>
    </MyBox>
  );
}
