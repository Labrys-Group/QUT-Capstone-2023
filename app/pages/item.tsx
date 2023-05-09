import { WalletContext } from "@/context/walletContext";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { useAccount } from "wagmi";
import LoadingPage from "@/components/LoadingPage";
import PageComponent from "@/components/PageComponent";

function Item() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);
  const [remainingToken, setRemainingToken] = useState<number | undefined>();
  const [tokenId, setTokenID] = useState<number | undefined>();
  const [access, setAccess] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  // wallet context
  const { erc721, accountAddress, balance } = useContext(WalletContext);

  // fetch user balance and totalsupply from backend
  const fetchAccess = async () => {
    const response = await fetch("/api/getBalance", {
      method: "POST",
      body: JSON.stringify({ address }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setRemainingToken(Number(data.totalSupply));
    if (data.userBalance == "0") {
      setAccess(false);
    } else {
      setTokenID(data.tokenId);
      setAccess(true);
    }
  };

  useEffect(() => {
    if (address !== undefined) {
      fetchAccess();
    }
  }, [address]);

  // verify session
  useEffect(() => {
    const securePage = async () => {
      if (!session) {
        router.push("/");
      } else {
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
  const exy = {
    title: "Exy United",
    description:
      "An exclusive online community dedicated to fans of EXY, leader of the K-pop girl group COSMIC GIRLS (also known as WJSN). This community is a gathering place for fans who admire EXY's talents, personality, and unique style. As a member of the EXY Community, you will have access to exclusive content, such as behind-the-scenes footage, photos, and interviews. You will also be able to connect with other fans from all over the world who share your love for EXY and COSMIC GIRLS.",
    image: "/exyGranted.png",
    backgroundClassName: "exyImg",
    gotoLeft: "item-table-tennis",
    gotoRight: "item-climbing-gym",
    price: 0.01,
    //for testing
    test: true,
  };

  let displayRemainingToken =
    remainingToken !== undefined ? 200 - remainingToken : 9999;

  return (
    <PageComponent
      title={exy.title}
      description={exy.description}
      address={address}
      image={exy.image}
      backgroundClassName={exy.backgroundClassName}
      gotoLeft={exy.gotoLeft}
      gotoRight={exy.gotoRight}
      access={exy.test}
      clubName={"Exy United"}
      price={exy.price}
      tokenId={tokenId}
      displayRemainingToken={displayRemainingToken}
    />
  );
}

export default Item;
