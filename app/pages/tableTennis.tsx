import { getSession, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import AddressBar from "../components/AddressBar";
import { useAccount } from "wagmi";
import ContentTitle from "@/components/ContentTitle";
import NavBar from "@/components/NavBar";
import LoadingPage from "@/components/LoadingPage";

const videos = [
  { src: "https://www.youtube.com/embed/iiepjLQiDic" },
  { src: "https://www.youtube.com/embed/9ZoEMXyP9Lc" },
  { src: "https://www.youtube.com/embed/_Bi3vOTH_do" },
];

function TableTennis() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const { pathname } = router;
  const trimmedPath = pathname.replace("/", "");

  //verify if user is log in and owns the NFT
  useEffect(() => {
    const securePage = async () => {
      const session1 = await getSession();
      let isMatchFound = false;
      session1?.owns.ownedNfts.forEach((nft: any) => {
        if (nft.contractMetadata.name == trimmedPath) {
          isMatchFound = true;
          return;
        }
      });
      if (!session1 || isMatchFound == false) {
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

  return (
    <Box className="tableTennisImg" paddingBottom={"10vh"}>
      <NavBar />
      <AddressBar status={address !== undefined} username={address} />

      <Box marginTop="20vh" className="pagePadding">
        <ContentTitle
          title="Table Tennis Club: SECRET ZONE"
          description="Members only content"
          videos={videos}
        />
      </Box>
    </Box>
  );
}

export default TableTennis;
