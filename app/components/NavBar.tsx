// Template here
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box, Image, Flex, Spacer } from "@chakra-ui/react";

//export type NavBarProps = {};
export const NavBar = () => {
  return (
    <Flex alignItems="center">
      <Box className="navBarLeft">
        <Image
          className="logoImg"
          src="https://i.ibb.co/cYs5dR4/Members-Only-Clear.png"
        />
      </Box>
      <Spacer />
      <Box className="navBarRight">
        <ConnectButton />
      </Box>
    </Flex>
  );
};
export default NavBar;
