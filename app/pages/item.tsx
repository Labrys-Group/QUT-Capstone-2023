import { getSession, signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'

function Item() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession()
      if (!session) {
        signIn()
      } else {
        setLoading(false)
      }
    }
    securePage()
  }, [])

  if (loading) {
    return <h2>Loading。。。</h2>
  }

  return <div>item page</div>
}

export default Item
