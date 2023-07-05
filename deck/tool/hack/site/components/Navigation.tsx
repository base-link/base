import styled from 'styled-components'
import Button, { LinkButton } from '~/components/Button'
import React, { useContext, useEffect, useState } from 'react'
import FA from '~/components/FA'

export const NavigationContext = React.createContext(
  (el: React.ReactNode) => {
    return
  },
)

export const NavigationOverlay = styled.div(props => ({
  background: props.theme.colors.white2,
  boxShadow: props.theme.shadows.belowLarge,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  height: 'calc(100vh - 60px)',
  maxWidth: 720,
  overflowY: 'auto',
  paddingBottom: 16,
  paddingTop: 16,
  position: 'fixed',
  top: 60,
  width: '100%',
  zIndex: 1001,
}))

const Logo = styled.div(props => ({
  backgroundImage: `url(${props.theme.images.logo.icon})`,
  backgroundSize: 32,
  height: 32,
  width: 32,
}))

type NavPropsType = {
  fade?: boolean
}

const Nav = styled.nav<NavPropsType>(props => ({
  alignItems: 'center',
  background: props.theme.colors.white,
  boxShadow: props.fade ? undefined : props.theme.shadows.belowLarge,
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: 720,
  position: 'fixed',
  top: 0,
  transition: 'box-shadow 0.2s',
  width: '100%',
  zIndex: 1000,
}))

export function useNoConfig() {
  const setConfigElement = useContext(NavigationContext)

  useEffect(() => {
    setConfigElement(null)
  }, [setConfigElement])
}

const NavigationButton = styled(Button)(props => ({
  background: 'none',
  height: 60,
  i: {
    color: props.theme.colors.black,
  },
  opacity: 0.5,
  padding: 16,
  textAlign: 'center',
  width: 60,
}))

const NavigationLink = styled(LinkButton)(props => ({
  background: 'none',
  height: 60,
  i: {
    color: props.theme.colors.black,
  },
  opacity: 0.5,
  padding: 16,
  textAlign: 'center',
  width: 60,
}))

type PropsType = {
  config?: React.ReactNode
}

export default function Navigation({ config }: PropsType) {
  const [showMenu, setShowMenu] = useState(false)
  const [fadeMenu, setFadeMenu] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setFadeMenu(true)
      } else if (fadeMenu) {
        setFadeMenu(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [fadeMenu, setFadeMenu])

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add('stop-scrolling')
    } else {
      document.body.classList.remove('stop-scrolling')
    }

    return () => {
      document.body.classList.remove('stop-scrolling')
    }
  }, [showMenu])

  return (
    <>
      <Nav fade={fadeMenu}>
        <NavigationLink href="/">
          <Logo />
        </NavigationLink>
        {config ? (
          <NavigationButton onClick={() => setShowMenu(x => !x)}>
            {showMenu ? (
              <FA
                name="minus"
                size={32}
              />
            ) : (
              <FA
                name="gear"
                size={32}
              />
            )}
          </NavigationButton>
        ) : (
          <div />
        )}
      </Nav>
      {showMenu && config}
    </>
  )
}
