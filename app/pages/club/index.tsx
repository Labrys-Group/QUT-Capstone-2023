import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

function Item() {
  const router = useRouter()
  const { data: session } = useSession()
  const clubs = session?.clubs

  //set the first page when user jump into the item page
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
