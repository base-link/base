import Router, { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import querystring, { ParsedUrlQuery } from 'querystring'

export const URLParamsContext = React.createContext<ParsedUrlQuery>({})

export function URLParamsProvider({ children }: PropsType) {
  const [params, setParams] = useState({})
  const router = useRouter()

  useEffect(() => {
    const query = querystring.parse(
      window?.location.search.split('?')[1],
    )
    setParams(query)

    const handleRouteChangeStart = (url: string) => {
      const query = querystring.parse(url.split('?')[1] ?? '')
      setParams(query)
    }

    Router.events.on('routeChangeComplete', handleRouteChangeStart)
  }, [router])

  return (
    <URLParamsContext.Provider value={params}>
      {children}
    </URLParamsContext.Provider>
  )
}

type PropsType = {
  children: React.ReactNode
}

export function useUrlParams() {
  return useContext(URLParamsContext)
}
