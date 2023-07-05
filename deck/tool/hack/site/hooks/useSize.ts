import * as React from 'react'
import useResizeObserver from '@react-hook/resize-observer'

export default function useSize<T extends HTMLElement>(
  target: React.RefObject<T>,
) {
  const [size, setSize] = React.useState<DOMRect>()

  React.useEffect(() => {
    if (target.current) {
      setSize(target.current.getBoundingClientRect())
    }
  }, [target])

  // Where the magic happens
  useResizeObserver(target, entry => setSize(entry.contentRect))
  return size
}
