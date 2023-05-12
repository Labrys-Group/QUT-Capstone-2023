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
  const [loading, setLoading] = useState<boolean>(true)
  const [remainingToken, setRemainingToken] = useState<number | undefined>()
  const [tokenId, setTokenID] = useState<number | undefined>()
  const [access, setAccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [item, setItem] = useState<string | undefined>('')
  const [clubNu, setClubNu] = useState<number | undefined>()
  const [right, setRight] = useState<string | undefined>()
  const [left, setLeft] = useState<string | undefined>()
  const [clubName, setClubName] = useState<string | undefined>()
  const [price, setPrice] = useState<string | undefined>()
  const { data: session } = useSession()
  const [description, setDescription] = useState<string | undefined>()
  const [contractAddress, setContractAddress] = useState<string | undefined>()
  const router = useRouter()
  // wallet context
  const itemName = router.query.item
  const { club } = useContext(ClubContext)

  interface ISession {
    owns: any
  }

  useEffect(() => {
    console.log(session)
    if (
      session !== undefined &&
      session !== null &&
      contractAddress !== undefined
    ) {
      session.owns.ownedNfts.forEach((item: string) => {
        if (
          contractAddress.toLowerCase() == item.contract.address.toLowerCase()
        ) {
          setAccess(true)
          return
        } else {
          setAccess(false)
        }
      })
    }
  }, [session, contractAddress])

  useEffect(() => {
    if (itemName !== undefined && club !== undefined) {
      console.log(club)
      const index: number = club.findIndex((obj) => obj.name === itemName)
      setClubNu(index)
      setDescription(club[index]?.description)
      setItem(club[index]?.title)
      setClubName(club[index]?.name)
      setPrice(club[index]?.price)
      setContractAddress(club[index]?.address)
      setLoading(false)
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
      access={access}
      clubName={item}
      price={price}
      tokenId={1111}
      displayRemainingToken={999}
    />
  )
}

export default Item
