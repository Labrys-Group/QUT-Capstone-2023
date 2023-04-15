import { getSession, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/router'
import { Text, Box, BoxProps, AspectRatio, Container, Flex, Grid, Spacer } from '@chakra-ui/react'
import { NavBarProps } from '../components/NavBar'
import ItemTitle from '../components/ItemTitle'
import AddressBar from '../components/AddressBar'
import DescriptionBox from '../components/DescriptionBox'
import KeyGranted from '../components/KeyGranted'
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
      <ItemTitle text="EXY UNITED: SECRET ZONE" />
      <Flex>
        <AspectRatio maxWidth='300px' ratio={12 / 15} flex='1'>
        <iframe
            title='Intro'
            src='exyIntro.mp4'
            allowFullScreen
        />
        </AspectRatio>

        <AspectRatio maxWidth='300px' ratio={12 / 15} flex='2'>
        <iframe
            title='Smile'
            src='exySmile.mp4'
            allowFullScreen
        />
        </AspectRatio>

        <AspectRatio maxWidth='300px' ratio={12 / 15} flex='3'>
        <iframe
            title='Reel9'
            src='exyReel9.mp4'
            allowFullScreen
        />
        </AspectRatio>
    </Flex>
    <br/>
      <Flex>

      <AspectRatio maxW='400px' flex='1'>
        <iframe
            title='Burinakae'
            src='https://www.youtube.com/embed/g-Bhp_ea6os'
            allowFullScreen
        />
        </AspectRatio>

        <AspectRatio maxW='400px' flex='2'>
        <iframe
            title='Diamonds'
            src='https://www.youtube.com/embed/eDff2WORFow'
            allowFullScreen
        />
        </AspectRatio>

        <AspectRatio maxW='400px' flex='3'>
        <iframe
            title='Wave'
            src='https://www.youtube.com/embed/aWX8_QER_qQ'
            allowFullScreen
        />
        </AspectRatio>
    </Flex>

    </Box>
  )
}

export default Item
