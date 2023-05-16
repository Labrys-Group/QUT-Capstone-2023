import { getSession, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import AddressBar from '../components/AddressBar'
import { useAccount } from 'wagmi'
import ContentTitle from '@/components/ContentTitle'
import NavBar from '@/components/NavBar'
import LoadingPage from '@/components/LoadingPage'

const images = [
  { src: 'exy_1.jpg', alt: 'Exy Lift Selfie' },
  { src: 'exyLift.jpg', alt: 'Exy Lift Selfie' },
  { src: 'exy_2.jpg', alt: 'Exy Lift Selfie' },
  { src: 'exy_3.jpg', alt: 'Exy Lift Selfie' },
]

const videos = [
  { src: 'https://www.youtube.com/embed/g-Bhp_ea6os' },
  { src: 'https://www.youtube.com/embed/eDff2WORFow' },
  { src: 'https://www.youtube.com/embed/ZBPQCKpoe6c' },
  { src: 'https://www.youtube.com/embed/aWX8_QER_qQ' },
]
function Exy() {
  const { address } = useAccount()
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log(session)
  }, [])

  useEffect(() => {
    const securePage = async () => {
      const session1 = await getSession()
      console.log(session)
      if (!session1) {
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
    <Box className="exyImg" paddingBottom={'10vh'}>
      <NavBar />
      <AddressBar status={address !== undefined} username={address} />

      <Box marginTop="20vh" className="pagePadding">
        <ContentTitle
          title="EXY UNITED: SECRET ZONE"
          description="Members only content"
          images={images}
          videos={videos}
        />
      </Box>
    </Box>
  )
}

export default Exy
