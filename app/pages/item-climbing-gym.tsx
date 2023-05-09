import { WalletContext } from "@/context/walletContext";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { useAccount } from "wagmi";
import LoadingPage from "@/components/LoadingPage";
import PageComponent from "@/components/PageComponent";

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
    image: "/climbingGranted.png",
    backgroundClassName: "climbingImg",
    gotoLeft: "item",
    gotoRight: "item-table-tennis",
    price: 0.01,
    clubName: "Climbing Gym",
    //access set to false by default
    access: false,
    //set tokenId to undefined by default
    tokenId: undefined,
    //set displayRemainingToken to 0 by default
    displayRemainingToken: 0,
  };

  // @TODO: access is always false
  return (
    <PageComponent
      title={climbing.title}
      description={climbing.description}
      address={address}
      image={climbing.image}
      backgroundClassName={climbing.backgroundClassName}
      gotoLeft={climbing.gotoLeft}
      gotoRight={climbing.gotoRight}
      access={climbing.access}
      clubName={climbing.clubName}
      price={climbing.price}
      tokenId={climbing.tokenId}
      displayRemainingToken={climbing.displayRemainingToken}
    />
  );
}

export default ItemClimbingGym;
