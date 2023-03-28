import React from 'react'
import {
  ChakraProvider,
  Heading,
  Stack,
  Text,
  Button,
  Center,
  Box,
  Image
} from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'

const App = () => (
  <ChakraProvider resetCSS>
    <Stack spacing={2} backgroundColor="#000000">
      <Box display="flex">
        <Box display="flex" width="30%" alignItems="stretch">
          <Image src="https://i.ibb.co/cYs5dR4/Members-Only-Clear.png" />
        </Box>
        <Box mr="auto" />
        <Button
          variant="solid"
          size="md"
          display="flex"
          width="30%"
          textAlign="center"
          backgroundColor="#7190FF"
          color="whiteAlpha.900"
          justifyContent="center"
          mt="auto"
          mb="auto"
          flexDirection="row"
          leftIcon={<LinkIcon />}
        >
          Connect Wallet
        </Button>
      </Box>
      <Heading
        size="md"
        as="h4"
        color="#7190FF"
        textAlign="center"
        display="block"
        letterSpacing="widest"
      >
        WELCOME TO
      </Heading>
      <Heading
        fontWeight="bold"
        textAlign="center"
        color="whiteAlpha.900"
        size="2xl"
      >
        MEMBERS ONLY
      </Heading>
      <Text color="whiteAlpha.800" textAlign="center">
        Your gateway to exclusive content from your favourite brands & services.
      </Text>
      <Text color="whiteAlpha.800" textAlign="center">
        All memberships secured as NFTs on the Ethereum blockchain.
      </Text>
      <Text>Text value</Text>
      <Text color="whiteAlpha.800" textAlign="center">
        To get started, first connect your wallet
      </Text>
      <Center border={0} borderRadius={0} opacity={1}>
        <Box width="45%" />
        <Button
          variant="solid"
          size="md"
          ml="auto"
          mr="auto"
          display="inline-block"
          width="30%"
          textAlign="center"
          backgroundColor="#7190FF"
          color="whiteAlpha.900"
          leftIcon={<LinkIcon />}
          minWidth="30%"
          overflow="visible"
          maxWidth="30%"
        >
          Connect Wallet
        </Button>
        <Box width="45%" />
      </Center>
      <Box height={500} backgroundColor="blackAlpha.900" />
    </Stack>
  </ChakraProvider>
)

export default App
