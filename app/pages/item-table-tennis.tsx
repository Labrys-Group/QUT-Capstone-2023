import { WalletContext } from "@/context/walletContext";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { useAccount } from "wagmi";
import LoadingPage from "@/components/LoadingPage";
import PageComponent from "@/components/PageComponent";

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
    backgroundClassName: "tableTennisImg",
    gotoLeft: "item-climbing-gym",
    gotoRight: "item",
    price: 0.01,
    clubName: "Table Tennis United",
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
      title={tableTennis.title}
      description={tableTennis.description}
      address={address}
      image={tableTennis.image}
      backgroundClassName={tableTennis.backgroundClassName}
      gotoLeft={tableTennis.gotoLeft}
      gotoRight={tableTennis.gotoRight}
      access={tableTennis.access}
      clubName={tableTennis.clubName}
      price={tableTennis.price}
      tokenId={tableTennis.tokenId}
      displayRemainingToken={tableTennis.displayRemainingToken}
    />
  );
}

export default ItemTableTennis;
