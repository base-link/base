/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react'

export default function useScrollIntoView(
  dependencies: React.DependencyList = [],
) {
  const localRef = useCallback((node: HTMLElement) => {
    const timeout = window.setTimeout(() => node?.scrollIntoView(), 16)

    return () => {
      window.clearTimeout(timeout)
    }
  }, dependencies)

  return localRef
}
