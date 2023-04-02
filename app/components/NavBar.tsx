// Template here
import { Box, Flex, Grid, GridItem, Spacer } from "@chakra-ui/react";

export type NavBarProps = {};

const TestComponent = ({}: NavBarProps) => {
  return (
    //          <MyBox display="flex">
    //     <MyBox display="flex" width="30%" alignItems="stretch">
    //       <Image src="https://i.ibb.co/cYs5dR4/Members-Only-Clear.png" />
    //     </MyBox>
    //     <Box mr="auto" />
    //     <ConnectButton />
    //   </MyBox>
    <Grid
      h="200px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={1} bg="tomato" />
      <GridItem colSpan={2} bg="papayawhip" />
      <GridItem colSpan={2} bg="papayawhip" />
      <GridItem colSpan={4} bg="tomato" />
    </Grid>
  );
};

export default TestComponent;
