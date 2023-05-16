import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { ClubContext } from '@/context/clubContext'

function Item() {
  const router = useRouter()
  const { clubs } = useContext(ClubContext)

  useEffect(() => {
    const Page = async () => {
      router.push({
        pathname: '/club/[item]',
        query: { item: 'exy' },
      })
    }

    Page()
  }, [clubs])

  return null
}

export default Item
