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

function ItemClimbingGym() {
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
  const climbing = {
    title: "Steve Climbing Gym",
    description:
      "Our state-of-the-art facility offers some of the most intense and exciting climbing experiences you'll find anywhere. And as a member of our club, you'll get exclusive access to training programs, gear reviews, and interviews with some of the top climbers in the world.",
    image: "/exyGranted.png",
  };

  // @TODO: access is always false
  return (
    <Box h="100vh" className="climbingImg">
      <NavBar />
      <AddressBar status={address !== undefined} username={address} />
      {/* //TODO: remove top margin */}
      <Flex
        className="pagePadding"
        marginTop="20vh"
        justifyContent="space-between"
        alignItems="center"
      >
        <NavigationButton direction="left" goto="item" />
        <TitleAndDescription
          title={climbing.title}
          description={climbing.description}
        />

        <KeyGranted
          accessGranted={false}
          clubName={climbing.title}
          image={climbing.image}
          price={0.01}
        />
        {/* <LoadingModal /> */}
        <NavigationButton direction="right" goto="item-table-tennis" />
      </Flex>
    </Box>
  );
}

export default ItemClimbingGym;
