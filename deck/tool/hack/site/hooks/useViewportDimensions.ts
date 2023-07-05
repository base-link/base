import { useState, useEffect } from 'react'

function getViewportDimensions() {
  const { innerWidth: width, innerHeight: height } =
    typeof window === 'undefined'
      ? { innerHeight: 0, innerWidth: 0 }
      : window

  return {
    height,
    width,
  }
}

export default function useViewportDimensions() {
  const [windowDimensions, setViewportDimensions] = useState({
    height: 0,
    width: 0,
  })

  useEffect(() => {
    function handleResize() {
      setViewportDimensions(getViewportDimensions())
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
