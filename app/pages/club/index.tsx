import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { ClubContext } from '@/context/clubContext'

function Item() {
  const router = useRouter()
  const { club } = useContext(ClubContext)

  useEffect(() => {
    const securePage = async () => {
      // check if authenticated and if is connected to wallet
      if (club == undefined || club == null) {
        console.log(club)
      } else {
        console.log(club)
        router.push({
          pathname: '/club/[item]',
          query: { item: club[0].name },
        })
      }
    }

    securePage()
  }, [club])

  return null
}

export default Item
