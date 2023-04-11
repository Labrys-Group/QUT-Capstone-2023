import { getSession, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/router'
import { Text, Box, BoxProps } from '@chakra-ui/react'
import { NavBarProps } from '@/components/NavBar'
import ItemTitle from '@/components/ItemTitle'
import AddressBar from '@/components/AddressBar'
import DescriptionBox from '@/components/DescriptionBox'
import KeyGranted from '@/components/KeyGranted'
import { useAccount } from 'wagmi'

function Item() {
  const { address } = useAccount()
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const securePage = async () => {
      const session1 = await getSession()
      if (!session1) {
        router.push('/')
      } else {
        setLoading(false)
      }
    }
    securePage()
  }, [session])

  if (loading) {
    return <h2>Loading。。。</h2>
  }

  return (
    <Box h="100vh" className="exyImg">
      <NavBarProps />
      <AddressBar status={address !== undefined} text={address} />
      <br/><br/><br/><br/><br/>
      <ItemTitle text="EXY UNITED" />
      <DescriptionBox/>
      <KeyGranted/>
    </Box>
  )
}

export default Item
