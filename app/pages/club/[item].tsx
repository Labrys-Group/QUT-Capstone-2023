import { useRouter } from 'next/router'
import { WalletContext } from '@/context/walletContext'
import { Box, Text, Button, useToast } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useContext, Provider } from 'react'
import { useAccount } from 'wagmi'
import LoadingPage from '@/components/LoadingPage'
import PageComponent from '@/components/PageComponent'
import { ClubContext } from '@/context/clubContext'
import { Contract, Signer, utils } from 'ethers'

function Item() {
  const { address, isConnected } = useAccount()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const [remainingToken, setRemainingToken] = useState<number | undefined>()
  const [tokenId, setTokenID] = useState<number | undefined>()
  const [access, setAccess] = useState<boolean>(false)

  const [title, setTitle] = useState<string | undefined>('')
  const [clubIndex, setClubIndex] = useState<number | undefined>()
  const [clubName, setClubName] = useState<string | undefined>()
  const [description, setDescription] = useState<string | undefined>()
  const [contractAddress, setContractAddress] = useState<string | undefined>()
  const [abi, setAbi] = useState<string | undefined>()
  const [price, setPrice] = useState<string | undefined>()

  const [right, setRight] = useState<string | undefined>()
  const [left, setLeft] = useState<string | undefined>()

  const { data: session } = useSession()

  const router = useRouter()
  const { signer } = useContext(WalletContext)

  // use club context
  const { clubs } = useContext(ClubContext)

  // get query from router
  const itemName = router.query.item

  // verify session
  useEffect(() => {
    const securePage = async () => {
      if (!session) {
        router.push('/')
      } else {
        setLoading(false)
      }
    }
    securePage()
  }, [session])

  useEffect(() => {
    if (itemName !== undefined && clubs !== undefined && clubs.length !== 0) {
      const index: number = clubs.findIndex((obj) => obj.name === itemName)
      setClubIndex(index)
      setDescription(clubs[index]?.description)
      setTitle(clubs[index]?.title)
      setClubName(clubs[index]?.name)
      setPrice(clubs[index]?.price)
      setContractAddress(clubs[index]?.address)
      setAbi(clubs[index]?.abi)
      setLoading(false)
    }
  }, [itemName, clubs])

  useEffect(() => {
    if (clubIndex !== undefined && clubs !== undefined && clubs.length !== 0) {
      judge()
    }
  }, [clubIndex, clubs])

  function judge() {
    if (clubIndex !== undefined && clubs !== undefined) {
      if (clubIndex == clubs.length - 1) {
        setRight(clubs[0].name)
        setLeft(clubs[clubIndex - 1].name)
        return
      }
      if (clubIndex == 0) {
        setLeft(clubs[clubs.length - 1].name)
        setRight(clubs[clubIndex + 1].name)
        return
      }
      setRight(clubs[clubIndex + 1].name)
      setLeft(clubs[clubIndex - 1].name)
    }
  }

  async function getTokenRemaining() {
    if (
      clubIndex !== undefined &&
      clubs !== undefined &&
      contractAddress !== undefined
    ) {
      const contract = contractAddress
      const abi = clubs[clubIndex].abi
      const res = await fetch('../api/getBalance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contract, abi }),
      })
      const data = await res.json()
      setRemainingToken(200 - data.totalSupply)
    }
  }

  useEffect(() => {
    if (
      session !== undefined &&
      session !== null &&
      contractAddress !== undefined
    ) {
      if (session.owns.ownedNfts.length == 0) {
        getTokenRemaining()
        setAccess(false)
      }
      for (const item of session.owns.ownedNfts) {
        if (
          contractAddress.toLowerCase() == item.contract.address.toLowerCase()
        ) {
          const newStr = item.id.tokenId.replace(/[0x]+/g, '')
          setTokenID(newStr)
          setAccess(true)
          return
        } else {
          getTokenRemaining()
          setAccess(false)
        }
      }
    }
  }, [session, contractAddress, remainingToken])

  const toast = useToast()

  const handleMint = async () => {
    try {
      if (contractAddress !== undefined && abi !== undefined) {
        toast({
          title: 'Loading',
          description: 'Trying to mint access token',
          status: 'loading',
        })
        const contract = new Contract(contractAddress, abi, signer)
        const transaction = await contract.mint({
          value: utils.parseEther('0.000000000000001'),
        })
        toast({
          title: 'Success',
          description: `View transaction at ${transaction.hash}`,
          status: 'success',
        })
      }
    } catch (e: any) {
      console.log(error)
      toast({
        title: 'Error',
        description: `${e.error}`,
        status: 'error',
      })
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

  return (
    <PageComponent
      image={clubName=='exy' ? '/' + clubName + 'Granted.gif' : '/' + clubName + 'Granted.png'}
      title={title ?? ''}
      description={description ?? ''}
      address={address}
      image_lock="/lock.png"
      backgroundClassName={clubName + 'Img'}
      gotoLeft={left ?? ''}
      gotoRight={right ?? ''}
      access={access}
      clubName={title ?? ''}
      price={price ?? ''}
      tokenId={tokenId}
      displayRemainingToken={remainingToken ?? 0}
      handleMint={() => handleMint()}
    />
  )
}

export default Item
