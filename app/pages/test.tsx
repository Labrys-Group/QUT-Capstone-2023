import { getSession, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { Text, Box, BoxProps, Flex, Button } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import AddressBar from "@/components/AddressBar";
import { useAccount } from "wagmi";
import TitleAndDescription from "@/components/TitleAndDescription";
import KeyGranted from "@/components/KeyGranted";
// import handler from "./api/addWalletAddress";

function TestPage() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  const onClick = async () => {
    
    const route = "/api/addWalletAddress";
    const test = await fetch(route, {});
    console.log(test);
  }

  useEffect(() => {
    const securePage = async () => {
      const session1 = await getSession();
      if (!session1) {
        router.push("/");
      } else {
        setLoading(false);
      }
    };
    securePage();
  }, [session]);

  if (loading) {
    return <h2>Loading。。。</h2>;
  }

  const exy = {
    title: "My Test Page",
    description:
      "Hello friends, this is a test page.",
    image: "/exyGranted.png",
  };

  return (
    <Box h="100vh" className="exyImg">
      <NavBar />
      <AddressBar status={address !== undefined} username={address} />
      {/* //TODO: remove top margin */}
      <Flex
        className="pagePadding"
        marginTop="20vh"
        justifyContent="space-between"
        alignItems="center"
      >
        <TitleAndDescription title={exy.title} description={exy.description} />
        <Text>Wallet Address</Text>
        <Text>0x1234561</Text>
        <Button colorScheme='blue' onClick={() => onClick()}>GET Wallet Addresses</Button>
        <Button colorScheme='green' onClick={() => onClick}>POST Wallet Address</Button>
      </Flex>
    </Box>
  );
}

export default TestPage;
