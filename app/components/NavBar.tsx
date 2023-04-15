// Template here
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box, Image, Flex, GridItem, Spacer } from "@chakra-ui/react";

//export type NavBarProps = {};
export const NavBar = () => {
  return (
    <Flex>
      <Box p="4" width="13%" alignItems="stretch" ml="40px">
        <Image src="https://i.ibb.co/cYs5dR4/Members-Only-Clear.png" />
      </Box>
      <Spacer />
      <Box p="4" mr="40px" mt="10px">
        <ConnectButton />
      </Box>
    </Flex>
  );
};
export default NavBar;
