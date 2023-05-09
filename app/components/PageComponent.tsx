import AddressBar from "@/components/AddressBar";
import KeyGranted from "@/components/KeyGranted";
import NavBar from "@/components/NavBar";
import TitleAndDescription from "@/components/TitleAndDescription";
import { Flex, Box } from "@chakra-ui/react";
import NavigationButton from "@/components/NavigationButton";
import SlideTransitionWrapper from "./SlideTransitionWrapper";

export type PageComponentProps = {
  title: string;
  description: string;
  address: string | undefined;
  image: string;
  backgroundClassName: string;
  gotoLeft: string;
  gotoRight: string;
  access: boolean;
  clubName: string;
  price: number;
  tokenId: number | undefined;
  displayRemainingToken: number;
};

const PageComponent = ({
  title,
  description,
  address,
  image,
  backgroundClassName,
  gotoLeft,
  gotoRight,
  access,
  clubName,
  price,
  tokenId,
  displayRemainingToken,
}: PageComponentProps) => {
  return (
    <Box min-height="100vh" className={backgroundClassName}>
      <NavBar />
      <AddressBar status={address !== undefined} username={address} />
      {/* //TODO: remove top margin */}
      <SlideTransitionWrapper>
        <Flex className="pagePadding itemBox">
          <NavigationButton direction="left" goto={gotoLeft} />
          <Flex className="itemDesc">
            <Box
              mb={{ base: "30px", md: "0px" }}
              mr={{ base: "0px", md: "30px" }}
            >
              <TitleAndDescription title={title} description={description} />
            </Box>

            <KeyGranted
              accessGranted={access}
              clubName={clubName}
              image={image}
              price={price}
              remainingToken={displayRemainingToken}
              totalToken={200}
              tokenNumber={tokenId}
            />
          </Flex>
          <NavigationButton direction="right" goto={gotoRight} />
        </Flex>
      </SlideTransitionWrapper>
    </Box>
  );
};

export default PageComponent;
