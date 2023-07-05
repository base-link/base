/* eslint-disable @typescript-eslint/no-explicit-any */
import '@code-hike/mdx/dist/index.css'
import '~/styles/index.css'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import Footer from '~/components/Footer'
import Navigation, { NavigationContext } from '~/components/Navigation'
import { MDXProvider } from '@mdx-js/react'
import { PreferencesProvider } from '~/hooks/usePreferences'
import styled, { ThemeProvider } from 'styled-components'
import useViewportDimensions from '~/hooks/useViewportDimensions'
import useReady from '~/hooks/useReady'
import { useCallback, useEffect, useState } from 'react'
import { Router } from 'next/router'
import DEFAULT_CONFIG, { FONT } from '~/configurations'
import {
  BlockQuote,
  Code,
  H1,
  H2,
  H3,
  Ol,
  P,
  Pre,
  Table,
  TableScroller,
  Ul,
} from '~/components/Content'
import {
  ConfigurationProvider,
  useConfiguration,
} from '~/hooks/useConfiguration'
import { useHostedFontLoader } from '~/hooks/useFontLoader'
import { StorageProvider } from '~/hooks/useStorage'
import preferences from '~/configurations/preferences'
import { URLParamsProvider } from '~/hooks/useUrlParams'

type OverlayPropsType = {
  isReady: boolean
}

const Overlay = styled.div<OverlayPropsType>(props => ({
  '.ch-code *': {
    fontFamily: 'latin',
    fontSize: 16,
    lineHeight: 1.7,
  },
  '.footnotes > ol': {
    marginLeft: '48px !important',
    marginTop: 16,
    maxWidth: 670,
    paddingRight: 16,
  },
  '.remark-highlight': {
    marginBottom: '32px !important',
    marginTop: 16,
    maxWidth: 720,
    width: '100%',
  },
  '.remark-highlight code': {
    borderRadius: '0px !important',
    lineHeight: '1.7 !important',
    padding: '0px !important',
  },
  '.remark-highlight pre': {
    background: props.theme.colors.black,
    borderRadius: '0px !important',
    margin: '0px !important',
    padding: '16px !important',
  },
  'a:hover .gg-container': {
    visibility: 'hidden',
  },
  'a:hover:not(.header)': {
    borderBottom: `1px dotted ${props.theme.colors.purple}`,
  },
  'a:not(.header)': {
    borderBottom: `1px dotted ${props.theme.colors.black}`,
  },
  display: 'flex',
  'div > ol:not(.custom)': {
    marginBottom: 16,
    marginTop: 16,
    paddingLeft: '32px !important',
    paddingRight: 16,
  },
  'div > ul:not(.custom)': {
    marginBottom: 16,
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  flexDirection: 'row',
  'h2 *': {
    fontFamily: 'Noto Sans Mono',
    lineHeight: 1.7,
  },
  'h3 *': {
    fontFamily: 'Noto Sans Mono',
    lineHeight: 1.7,
  },
  'h4 *': {
    fontFamily: 'Noto Sans Mono',
    lineHeight: 1.7,
  },
  justifyContent: 'center',
  li: {
    textAlign: 'left',
  },
  'li p': {
    paddingLeft: 0,
    paddingRight: 0,
  },
  'ol:not(.custom)': {
    paddingLeft: 16,
  },
  opacity: props.isReady ? 1 : 0,
  overflowX: 'hidden',
  overflowY: 'auto',
  p: {
    marginBottom: 16,
    textAlign: 'left',
  },
  pre: {
    background: props.theme.colors.black,
    borderRadius: '0px !important',
    color: props.theme.colors.white2,
    margin: '16px 0px 32px 0px !important',
    maxWidth: 720,
    overflowX: 'auto',
    padding: '16px !important',
    width: '100%',
  },
  'sup a': {
    borderBottom: `none !important`,
  },
  transition: 'opacity 0.2s ease-in',
  width: '100%',
  zIndex: 100,
}))

const Body = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  minHeight: 'calc(100vh - 100px)',
})

type BodyWrapperPropsType = {
  isReady: boolean
}

const BodyWrapper = styled.div<BodyWrapperPropsType>(props => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'space-between',
  maxWidth: 720,
  minHeight: '100vh',
  minWidth: 300,
  opacity: props.isReady ? 1 : 0,
  paddingBottom: '80vh',
  width: '100%',
}))

type BackgroundPropsType = {
  background?: string
}

const SidebarLeft = styled.div<BackgroundPropsType>(props => ({
  alignItems: 'center',
  background: props.background ?? props.theme.colors.green,
  bottom: 0,
  display: 'flex',
  flex: 1,
  ins: {
    display: 'block',
    height: 600,
    minWidth: 300,
    position: 'fixed',
    top: 16,
  },
  justifyContent: 'flex-end',
  minWidth: 332,
  padding: 16,
  top: 0,
}))

const SidebarRight = styled.div<BackgroundPropsType>(props => ({
  background: props.background ?? props.theme.colors.green,
  bottom: 0,
  display: 'flex',
  flex: 1,
  ins: {
    display: 'block',
    height: 600,
    minWidth: 300,
    position: 'fixed',
    top: 16,
  },
  justifyContent: 'flex-start',
  minWidth: 332,
  padding: 16,
  top: 0,
}))

const components = {
  blockquote: (props: React.ComponentProps<any>) => {
    return <BlockQuote {...props} />
  },
  code: (props: React.ComponentProps<any>) => {
    return <Code {...props} />
  },
  h1: (props: React.ComponentProps<any>) => {
    return <H1 {...props} />
  },
  h2: (props: React.ComponentProps<any>) => {
    return <H2 {...props} />
  },
  h3: (props: React.ComponentProps<any>) => {
    return <H3 {...props} />
  },
  ol: (props: React.ComponentProps<any>) => {
    return <Ol {...props} />
  },
  p: (props: React.ComponentProps<any>) => {
    return <P {...props} />
  },
  pre: (props: React.ComponentProps<any>) => {
    return <Pre {...props} />
  },
  table: (props: React.ComponentProps<any>) => {
    return (
      <TableScroller>
        <Table
          {...props}
          className="markdown"
        />
      </TableScroller>
    )
  },
  ul: (props: React.ComponentProps<any>) => {
    return <Ul {...props} />
  },
}

type LoaderPropsType = {
  children: React.ReactNode
}

function Loader({ children }: LoaderPropsType) {
  const loadFont = useHostedFontLoader()
  const config = useConfiguration()
  const viewportWidth = useViewportDimensions()
  const isMobile = viewportWidth.width < 720

  useEffect(() => {
    if (config.data.isMobile !== isMobile) {
      config.set({ isMobile })
    }
  }, [config, isMobile])

  useEffect(() => {
    FONT.forEach(name => loadFont(name))
  }, [loadFont])

  return <ThemeProvider theme={config.data}>{children}</ThemeProvider>
}

// https://dev.to/chenni/how-to-persist-components-between-pages-in-nextjs-and-why-it-works-1hg8
export default function App({ Component, pageProps }: AppProps) {
  const viewportWidth = useViewportDimensions()
  const isMobile = viewportWidth.width < 720
  const isSmallScreen = viewportWidth.width < 1400 && !isMobile
  const isReady = useReady()
  const [config, setConfig] = useState<React.ReactNode>()
  const [loading, setLoading] = useState(false)

  const handleAddConfigElement = useCallback(
    (el: React.ReactNode) => {
      setConfig(el)
    },
    [setConfig],
  )

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true)
    }
    const handleRouteChangeComplete = () => {
      setLoading(false)
    }

    Router.events.on('routeChangeStart', handleRouteChangeStart)
    Router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart)
      Router.events.off(
        'routeChangeComplete',
        handleRouteChangeComplete,
      )
    }
  }, [])

  return (
    <StorageProvider storable={preferences}>
      <URLParamsProvider>
        <ConfigurationProvider config={DEFAULT_CONFIG}>
          <Loader>
            <MDXProvider components={components}>
              <PreferencesProvider>
                <NavigationContext.Provider
                  value={handleAddConfigElement}
                >
                  <GoogleAnalytics trackPageViews />
                  <Script
                    async
                    crossOrigin="anonymous"
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2593838011725409"
                  />
                  <Overlay isReady={isReady}>
                    {!isMobile && (
                      <SidebarLeft
                        className="side"
                        // background={background}
                      >
                        <AdSense.Google
                          client="ca-pub-2593838011725409"
                          slot="8961722347"
                          format=""
                          responsive="true"
                        />
                      </SidebarLeft>
                    )}
                    <BodyWrapper isReady={true}>
                      <Body>
                        <Navigation config={config} />
                        <Component {...pageProps} />
                      </Body>
                      <Footer />
                    </BodyWrapper>
                    {!isSmallScreen && !isMobile && (
                      <SidebarRight
                        className="side"
                        // background={background}
                      >
                        <AdSense.Google
                          client="ca-pub-2593838011725409"
                          slot="3577533724"
                          format=""
                          responsive="true"
                        />
                      </SidebarRight>
                    )}
                  </Overlay>
                  <Explosion />
                </NavigationContext.Provider>
              </PreferencesProvider>
            </MDXProvider>
          </Loader>
        </ConfigurationProvider>
      </URLParamsProvider>
    </StorageProvider>
  )
}
