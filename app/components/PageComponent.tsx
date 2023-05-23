import AddressBar from "@/components/AddressBar";
import KeyGranted from "@/components/KeyGranted";
import NavBar from "@/components/NavBar";
import TitleAndDescription from "@/components/TitleAndDescription";
import { Flex, Box } from "@chakra-ui/react";
import NavigationButton from "@/components/NavigationButton";
import { motion, AnimatePresence } from "framer-motion";

export type PageComponentProps = {
  title: string;
  description: string;
  address: string | undefined;
  image_lock: string;
  image: string;
  backgroundClassName: string;
  gotoLeft: string;
  gotoRight: string;
  access: boolean;
  clubName: string;
  price: string;
  tokenId: number | undefined;
  displayRemainingToken: number;
  handleMint(): void;
};

const PageComponent = ({
  title,
  description,
  address,
  image_lock,
  image,
  backgroundClassName,
  gotoLeft,
  gotoRight,
  access,
  clubName,
  price,
  tokenId,
  displayRemainingToken,
  handleMint,
}: PageComponentProps) => {
  return (
    <Box
      // height={{ md: "100vh" }}
      minHeight={"100vh"}
      className={backgroundClassName}
    >
      <NavBar />

      <AddressBar status={address !== undefined} username={address} />
      {/* //TODO: remove top margin */}
      <AnimatePresence>
        <motion.div
          key={title}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
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
                handleMint={handleMint}
                accessGranted={access}
                clubName={clubName}
                image_lock={image_lock}
                image={image}
                price={price}
                remainingToken={displayRemainingToken}
                totalToken={200}
                tokenNumber={tokenId}
                title={title}
              />
            </Flex>

            <NavigationButton direction="right" goto={gotoRight} />
          </Flex>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default PageComponent;
