import { useRouter } from 'next/router'
import { WalletContext } from '@/context/walletContext'
import { Box, Text, Button } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useContext } from 'react'
import { useAccount } from 'wagmi'
import LoadingPage from '@/components/LoadingPage'
import PageComponent from '@/components/PageComponent'
import { ClubContext } from '@/context/clubContext'
import NavigationButton from '@/components/NavigationButton'

function Item() {
  const { address, isConnected } = useAccount()
  const [loading, setLoading] = useState<boolean>(false)
  const [remainingToken, setRemainingToken] = useState<number | undefined>()
  const [tokenId, setTokenID] = useState<number | undefined>()
  const [access, setAccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [item, setItem] = useState<string>('')
  const [clubNu, setClubNu] = useState<number | undefined>()
  const [right, setRight] = useState<string | undefined>()
  const [left, setLeft] = useState<string | undefined>()
  const [clubName, setClubName] = useState<string | undefined>()
  const [price, setPrice] = useState<string | undefined>()
  const { data: session } = useSession()
  const [description, setDescription] = useState<string | undefined>()

  const router = useRouter()
  // wallet context
  const itemName = router.query.item
  const { club } = useContext(ClubContext)

  useEffect(() => {
    console.log(club)
    if (itemName !== undefined && club !== undefined) {
      const index = club.findIndex((obj) => obj.name === itemName)
      setClubNu(index)
      setDescription(club[index].description)
      setItem(club[index].title)
      setClubName(club[index].name)
      setPrice(club[index].price)
    }
  }, [itemName, club])

  useEffect(() => {
    judge()
  }, [clubNu, club])

  function judge() {
    if (clubNu !== undefined && club !== undefined) {
      if (clubNu == club.length - 1) {
        setRight(club[0].name)
        setLeft(club[clubNu - 1].name)
        return
      }
      if (clubNu == 0) {
        setLeft(club[club.length - 1].name)
        setRight(club[clubNu + 1].name)
        return
      }
      setRight(club[clubNu + 1].name)
      setLeft(club[clubNu - 1].name)
    }
  }

  if (loading) {
    return (
      <Box>
        <LoadingPage />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Text>500</Text>
      </Box>
    )
  }

  // @TODO: move this to constant folder
  let exy = {
    title: { item },
    description:
      "An exclusive online community dedicated to fans of EXY, leader of the K-pop girl group COSMIC GIRLS (also known as WJSN). This community is a gathering place for fans who admire EXY's talents, personality, and unique style. As a member of the EXY Community, you will have access to exclusive content, such as behind-the-scenes footage, photos, and interviews. You will also be able to connect with other fans from all over the world who share your love for EXY and COSMIC GIRLS.",
    image: '/exyGranted.png',
    backgroundClassName: 'exyImg',
    gotoLeft: '1',
    gotoRight: '2',
    price: 0.01,
    //for testing
    test: true,
  }

  let displayRemainingToken =
    remainingToken !== undefined ? 200 - remainingToken : 9999

  return (
    <PageComponent
      title={item}
      description={description}
      address={address}
      image={'/' + clubName + 'Granted.png'}
      backgroundClassName={clubName + 'Img'}
      gotoLeft={left}
      gotoRight={right}
      access={false}
      clubName={item}
      price={price}
      tokenId={1111}
      displayRemainingToken={999}
    />
  )
}

export default Item
