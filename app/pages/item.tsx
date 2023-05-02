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

  // get total supply
  async function getToken() {
    if (erc721 != undefined) {
      setRemainingToken(await getTotalSupply(erc721));
    }
  }

  // verify token
  // @TODO: move this to backend and verify by erc721.balanceOf >0
  useEffect(() => {
    console.log("run verify useEffect");
    getToken();
    // if user do not have any nfts, break
    if (balance === 0 || balance === undefined) return; // else
    (async () => {
      if (erc721 !== undefined) {
        // get number of minted nft
        const totalSupply = await getTotalSupply(erc721);
        console.log("totalSupply", totalSupply);
        if (totalSupply >= 0) {
          for (let i = 1; i <= totalSupply; i++) {
            console.log("tokenId", i);
            let access = await erc721.verifyAccess(accountAddress, i);
            if (access) {
              setTokenID(i);
              setAccess(true);
              break;
            }
          }
        }
      }
    })();
  }, [balance, erc721]);

  // verify session
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
  const exy = {
    title: "Exy United",
    description:
      "An exclusive online community dedicated to fans of EXY, leader of the K-pop girl group COSMIC GIRLS (also known as WJSN). This community is a gathering place for fans who admire EXY's talents, personality, and unique style. As a member of the EXY Community, you will have access to exclusive content, such as behind-the-scenes footage, photos, and interviews. You will also be able to connect with other fans from all over the world who share your love for EXY and COSMIC GIRLS.",
    image: "/exyGranted.png",
  };

  let displayRemainingToken =
    remainingToken !== undefined ? 200 - remainingToken : 9999;

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
        <NavigationButton direction="left" goto="item-table-tennis" />
        <TitleAndDescription title={exy.title} description={exy.description} />

        <KeyGranted
          accessGranted={access}
          clubName={"Exy United"}
          image={exy.image}
          price={0.01}
          remainingToken={displayRemainingToken}
          totalToken={200}
          tokenNumber={tokenId}
        />
        <NavigationButton direction="right" goto="item-climbing-gym" />
      </Flex>
    </Box>
  );
}

export default Item;
