import { getSession, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, AspectRatio, Flex, Spacer, Image } from "@chakra-ui/react";
import AddressBar from "../components/AddressBar";
import { useAccount } from "wagmi";
import TitleAndDescription from "../components/TitleAndDescription";
import NavBar from "@/components/NavBar";

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

  if (loading) {
    return <h2>Loading。。。</h2>;
  }

  return (
    <Box h="100vh" className="exyImg">
      <NavBar />
      <AddressBar status={address !== undefined} text={address} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <TitleAndDescription title="EXY UNITED: SECRET ZONE" />
      <Flex>
        <AspectRatio maxWidth="300px" ratio={12 / 15} flex="1">
          <iframe title="Intro" src="exyIntro.mp4" allowFullScreen />
        </AspectRatio>

        <AspectRatio maxWidth="300px" ratio={12 / 15} flex="2">
          <iframe title="Smile" src="exySmile.mp4" allowFullScreen />
        </AspectRatio>

        <AspectRatio maxWidth="300px" ratio={12 / 15} flex="3">
          <iframe title="Reel9" src="exyReel9.mp4" allowFullScreen />
        </AspectRatio>

        <Spacer />

        <Box maxWidth="300px" flex="4">
          <Image src="exyLift.jpg" alt="Exy Lift Selfie" />
        </Box>

        <Spacer />
      </Flex>
      <br />
      <Flex>
        <AspectRatio maxW="400px" flex="1">
          <iframe
            title="Burinakae"
            src="https://www.youtube.com/embed/g-Bhp_ea6os"
            allowFullScreen
          />
        </AspectRatio>

        <AspectRatio maxW="400px" flex="2">
          <iframe
            title="Diamonds"
            src="https://www.youtube.com/embed/eDff2WORFow"
            allowFullScreen
          />
        </AspectRatio>

        <AspectRatio maxW="400px" flex="3">
          <iframe
            title="Gloomy Letter"
            src="https://www.youtube.com/embed/ZBPQCKpoe6c"
            allowFullScreen
          />
        </AspectRatio>

        <AspectRatio maxW="400px" flex="4">
          <iframe
            title="Wave"
            src="https://www.youtube.com/embed/aWX8_QER_qQ"
            allowFullScreen
          />
        </AspectRatio>
      </Flex>
    </Box>
  );
}

export default Item;
