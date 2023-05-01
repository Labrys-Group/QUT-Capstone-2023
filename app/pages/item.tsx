import AddressBar from '@/components/AddressBar'
import KeyGranted from '@/components/KeyGranted'
import LoadingModal from '@/components/LoadingModal'
import NavBar from '@/components/NavBar'
import TitleAndDescription from '@/components/TitleAndDescription'
import { Flex, Box } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

function Item() {
  const { address, isConnected } = useAccount()
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const securePage = async () => {
      if (!session) {
        router.push('/')
      } else {
        console.log(session)
        setLoading(false)
      }
    }
    securePage()
  }, [session])

  if (loading) {
    return <h2>Loading。。。</h2>
  }

  // @TODO: move this to constant folder
  const exy = {
    title: 'Exy United',
    description:
      "An exclusive online community dedicated to fans of EXY, leader of the K-pop girl group COSMIC GIRLS (also known as WJSN). This community is a gathering place for fans who admire EXY's talents, personality, and unique style. As a member of the EXY Community, you will have access to exclusive content, such as behind-the-scenes footage, photos, and interviews. You will also be able to connect with other fans from all over the world who share your love for EXY and COSMIC GIRLS.",
    image: '/exyGranted.png',
  }

  return (
    <Box h="100vh" className="exyImg">
      <NavBar />
      <AddressBar status={address !== undefined} username={address} />
      {/* //TODO: remove top margin */}
      <Flex
        className="pagePadding"
        marginTop="20vh"
        justifyContent="space-between"
        alignItems="center">
        <TitleAndDescription title={exy.title} description={exy.description} />
        <KeyGranted
          accessGranted={true}
          clubName={'Exy United'}
          image={exy.image}
          //hard code for now
          price={0.01}
        />
        {/* <LoadingModal /> */}
      </Flex>
    </Box>
  )
}

export default Item
