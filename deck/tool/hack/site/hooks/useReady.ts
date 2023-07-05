import { useEffect, useState } from 'react'

export default function useReady() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [setIsReady])

  return isReady
}
