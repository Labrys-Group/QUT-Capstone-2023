import { getSession, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, ScaleFade } from '@chakra-ui/react'

import AddressBar from '../components/AddressBar'
import { useAccount } from 'wagmi'
import ContentTitle from '@/components/ContentTitle'
import NavBar from '@/components/NavBar'
import LoadingPage from '@/components/LoadingPage'
import QRCodeGenerator from '@/components/QRCodeGenerator'

function Climbing() {
  const { address } = useAccount()
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const router = useRouter()
  const { pathname } = router
  const trimmedPath = pathname.replace('/', '')
  useEffect(() => {
    const securePage = async () => {
      const session1 = await getSession()
      let isMatchFound = false
      session1?.owns.ownedNfts.forEach((nft: any) => {
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

export default Climbing
