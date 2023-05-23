import { getSession, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Divider, Flex, Spacer } from "@chakra-ui/react";
import AddressBar from "../components/AddressBar";
import { useAccount } from "wagmi";
import ContentTitle from "@/components/ContentTitle";
import NavBar from "@/components/NavBar";
import LoadingPage from "@/components/LoadingPage";
import { Spotify } from "react-spotify-embed";

const images = [
  { src: "exy_1.jpg", alt: "Exy Peace Pose" },
  { src: "exyLift.jpg", alt: "Exy Lift Selfie" },
  { src: "exy_2.jpg", alt: "Exy Black & White Pose" },
  { src: "exy_3.jpg", alt: "Exy Showing Off Her Tteokbokki Pose" },
];

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

  useEffect(() => {
    console.log(session);
  }, []);

  useEffect(() => {
    const securePage = async () => {
      const session1 = await getSession();
      console.log(session);
      if (!session1) {
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
