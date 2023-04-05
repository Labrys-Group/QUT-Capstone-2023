import React from 'react'
import { Heading, Stack, Text, Center, Box, Image } from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import PrimaryButton from '@/components/PrimaryButton'
import TitleComponent from '@/components/TitleComponent'
import { RainbowButton } from '@/components/RainbowButton'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import ethers from 'ethers'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function App() {
  const { address } = useAccount()
  const { data: session } = useSession()

  return (
    <Stack spacing={22}>
      <Box display="flex">
        <Box display="flex" width="30%" alignItems="stretch">
          <Image src="https://i.ibb.co/cYs5dR4/Members-Only-Clear.png" />
        </Box>
        <Box mr="auto" />
        <ConnectButton />
      </Box>
      <Heading
        size="md"
        as="h4"
        color="#7190FF"
        textAlign="center"
        display="block"
        letterSpacing="widest">
        WELCOME TO
      </Heading>
      <Heading
        fontWeight="bold"
        textAlign="center"
        color="whiteAlpha.900"
        size="2xl">
        MEMBERS ONLY
      </Heading>
      {/* {address && <Text>My address is {address}</Text>} */}
      <Text color="whiteAlpha.800" textAlign="center">
        Your gateway to exclusive content from your favourite brands & services.
      </Text>
      <Text color="whiteAlpha.800" textAlign="center">
        All memberships secured as NFTs on the Ethereum blockchain.
      </Text>
      <Text color="whiteAlpha.800" textAlign="center">
        To get started, first connect your wallet
      </Text>
      <Center border={0} borderRadius={0} opacity={1}>
        <Box width="45%" />
        <ConnectButton />
        <Box width="45%" />
      </Center>
    </Stack>
  )
}
