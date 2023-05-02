import AddressBar from "@/components/AddressBar";
import KeyGranted from "@/components/KeyGranted";
import NavBar from "@/components/NavBar";
import TitleAndDescription from "@/components/TitleAndDescription";
import { WalletContext } from "@/context/walletContext";
import getTotalSupply from "@/helpers/getTotalSupply";
import { Flex, Box, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { useAccount } from "wagmi";
import LoadingPage from "@/components/LoadingPage";
import NavigationButton from "@/components/NavigationButton";

function ItemTableTennis() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  // @TODO: verify with the right contract
  const { erc721, accountAddress, balance } = useContext(WalletContext);

  useEffect(() => {
    const securePage = async () => {
      if (!session) {
        router.push("/");
      } else {
        console.log(session);
        setLoading(false);
      }
    };
    securePage();
  }, [session]);

  if (loading) {
    return (
      <Box>
        <LoadingPage />
      </Box>
    );
  }

  // @TODO: move this to constant folder
  const tableTennis = {
    title: "Table Tennis",
    description:
      "Welcome to the Table Tennis Club, where we are passionate about the sport of ping pong! As a member of our exclusive club, you'll have access to a wealth of exclusive content, including training videos, match highlights, and interviews with some of the top players in the game.",
    image: "/exyGranted.png",
  };

  // @TODO: access is always false
  return (
    <Box h="100vh" className="tableTennisImg">
      <NavBar />
      <AddressBar status={address !== undefined} username={address} />
      {/* //TODO: remove top margin */}
      <Flex
        className="pagePadding"
        marginTop="20vh"
        justifyContent="space-between"
        alignItems="center"
      >
        <NavigationButton direction="left" goto="item-climbing-gym" />
        <TitleAndDescription
          title={tableTennis.title}
          description={tableTennis.description}
        />

        <KeyGranted
          accessGranted={false}
          clubName={tableTennis.title}
          image={tableTennis.image}
          price={0.01}
        />
        {/* <LoadingModal /> */}
        <NavigationButton direction="right" goto="item" />
      </Flex>
    </Box>
  );
}

export default ItemTableTennis;
