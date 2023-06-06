import { Spinner, Text, Flex } from "@chakra-ui/react";

export const LoadingPage = () => {
  return (
    <Flex h="100vh" className="flexAlgnCenter">
      <Flex h="100%" className="flexAlgnCenter" justifyContent={"center"}>
        <Text className="headingSm">Loading...</Text>
        <Spinner
          thickness="5px"
          speed="1s"
          emptyColor="gray.200"
          color="#7190FF"
          size="xl"
          mt="20px"
        />
      </Flex>
    </Flex>
  );
};
export default LoadingPage;
