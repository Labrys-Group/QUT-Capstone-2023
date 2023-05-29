import { getSession, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, ScaleFade } from '@chakra-ui/react'

import AddressBar from '../components/AddressBar'
import { useAccount } from 'wagmi'
import ContentTitle from '@/components/ContentTitle'
import NavBar from '@/components/NavBar'
import LoadingPage from '@/components/LoadingPage'
import { Spotify } from 'react-spotify-embed'
import QRCodeGenerator from '@/components/QRCodeGenerator'

const images = [
  { src: 'exy_1.jpg', alt: 'Exy Peace Pose' },
  { src: 'exyLift.jpg', alt: 'Exy Lift Selfie' },
  { src: 'exy_2.jpg', alt: 'Exy Black & White Pose' },
  { src: 'exy_3.jpg', alt: 'Exy Showing Off Her Tteokbokki Pose' },
]

const videos = [
  { src: 'https://www.youtube.com/embed/g-Bhp_ea6os' },
  { src: 'https://www.youtube.com/embed/eDff2WORFow' },
  { src: 'https://www.youtube.com/embed/ZBPQCKpoe6c' },
  { src: 'https://www.youtube.com/embed/aWX8_QER_qQ' },
]

const playlists = [
  { link: 'https://open.spotify.com/playlist/2FoneT7G5hqPzZHCApiZHi' },
  { link: 'https://open.spotify.com/playlist/3bnJMGcWgAI6SOg5RrJ4ao' },
  { link: 'https://open.spotify.com/playlist/3dGsgWV86aPN9wjcbkwDMf' },
  { link: 'https://open.spotify.com/playlist/0kx5D2fqVJ4JMeRBItZJ0n' },
]

function Exy() {
  const { address } = useAccount()
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const router = useRouter()
  const { pathname } = router
  const trimmedPath = pathname.replace('/', '')

  useEffect(() => {
    const securePage = async () => {
      const session1 = await getSession()
      if (!session) {
        router.push('/')
      }
      let isMatchFound = false
      session?.owns.ownedNfts.forEach((nft: any) => {
        if (nft.contractMetadata.name == trimmedPath) {
          isMatchFound = true
          return
        }
      })
      if (!session1 || isMatchFound == false) {
        router.push('/')
      } else {
        setLoading(false)
      }
    }
    securePage()
  }, [session])

  if (loading) {
    return (
      <Box>
        <LoadingPage />
      </Box>
    )
  }

  return (
    <Box className="climbingImg2" paddingBottom={'10vh'} minHeight={'100vh'}>
      <NavBar />
      <AddressBar status={address !== undefined} username={address} />

      <Box marginTop="20vh" className="pagePadding">
        <ContentTitle
          title="Steve Climbing GYM - Membership"
          description="Membership QR Code"
        />
        <ScaleFade in={true} initialScale={0.9}>
          <Box className={'flexAlgnCenter'}>
            <QRCodeGenerator uniqueId={address || ''} />
          </Box>
        </ScaleFade>
      </Box>
    </Box>
  )
}

export default Exy
