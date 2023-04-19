import React from 'react'
import { useState, useEffect } from 'react'
import { Text, Box, BoxProps, Flex } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import NavBar from '@/components/NavBar'
import { getSession, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function App() {
  const account = useAccount()
  const { data: session } = useSession()
  const router = useRouter()

  const status = account.status

  useEffect(() => {
    const securePage = async () => {
      //check if authenticated and if is connected to wallet
      console.log(status)
      if (session && status === 'connected') {
        router.push('/item')
      } else {
      }
    }
    securePage()
  }, [session, status])

  return (
    <Box h="100vh" className="bgImg">
      <NavBar />

      <Flex h="30vh" mt="10vh" flexDirection="column" alignItems="center">
        <Text className="blueTxt">WELCOME TO</Text>
        <Text className="title">MEMBERS ONLY</Text>
        <Text className="txt">
          Your gateway to exclusive content from your favourite brands &
          services.
        </Text>
        <Text className="txt">
          All memberships secured as NFTs on the Ethereum blockchain.
        </Text>
      </Flex>
      <Box className="flexAlgnCenter">
        <ConnectButton />
        {/* <ConnectInformationComponent connected={isConnected} /> */}
      </Box>
    </Box>
  )
}
