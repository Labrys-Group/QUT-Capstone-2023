import { getSession, useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import AddressBar from "@/components/AddressBar";
import { useAccount } from "wagmi";
import TitleAndDescription from "@/components/TitleAndDescription";
import KeyGranted from "@/components/KeyGranted";
import { WalletContext } from "@/context/walletContext";
import getTotalSupply from "@/helpers/getTotalSupply";

function Item() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

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

  //verify access
  const { erc721, accountAddress, balance } = useContext(WalletContext);

  const [access, setAccess] = useState(false);
  useEffect(() => {
    // if user do not have any nfts, break
    if (balance === 0 || balance === undefined) return;
    // else
    (async () => {
      if (erc721 !== undefined) {
        // get number of minted nft
        const totalSupply = await getTotalSupply(erc721);
        console.log("totalSupply", totalSupply);
        if (totalSupply > 0) {
          for (let i = 1; i <= totalSupply; i++) {
            console.log("tokenId", i);
            let access = await erc721.verifyAccess(accountAddress, i);
            if (access) {
              setAccess(true);
              break;
            }
          }
        }
      }
    })();
  }, [erc721]);

  if (loading) {
    return <h2>Loading。。。</h2>;
  }

  // @TODO: move this to constant folder
  const exy = {
    title: "Exy United",
    description:
      "An exclusive online community dedicated to fans of EXY, leader of the K-pop girl group COSMIC GIRLS (also known as WJSN). This community is a gathering place for fans who admire EXY's talents, personality, and unique style. As a member of the EXY Community, you will have access to exclusive content, such as behind-the-scenes footage, photos, and interviews. You will also be able to connect with other fans from all over the world who share your love for EXY and COSMIC GIRLS.",
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

        <KeyGranted
          accessGranted={access}
          clubName={"Exy United"}
          image={exy.image}
          price={0.01}
        />
      </Flex>
    </Box>
  );
}

export default Item;
