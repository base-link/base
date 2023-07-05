import React from 'react'
import { Link, Texture, Box } from '@lancejpollard/kit'
import Type from './Type'
import styled from 'styled-components'
import theme from '~/configurations/theme'
import _ from 'lodash'

type PropsType = {
  next?: string
}

const Logo = styled.span({
  backgroundImage: `url(${theme.images.logo.sketch})`,
  backgroundSize: '192px 192px',
  display: 'flex',
  height: 192,
  width: 192,
})

const Nav = styled.div({
  alignItems: 'center',
  flexDirection: 'column',
  gap: 32,
  justifyContent: 'center',
  paddingBottom: 32,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 32,
})

const Footer = styled.footer({
  a: {
    borderBottom: 'none !important',
    fontSize: 32,
    textDecoration: 'none',
  },
  height: 100,
  textAlign: 'center',
})

const PreviousLink = styled.div({
  a: {
    fontFamily: 'Noto Sans Mono',
    fontSize: 16,
    textAlign: 'center',
  },
})

const LogoLink = styled(Link)({
  display: 'inline-block',
})

const Ul = styled.ul({
  a: {
    fontSize: 16,
  },
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  fontSize: 16,
  gap: 16,
  justifyContent: 'center',
  listStyleType: 'none',
})

export default function Title({ next }: PropsType) {
  return (
    <Footer>
      <Nav>
        {next && (
          <PreviousLink>
            <Link href={next}>▼</Link>
          </PreviousLink>
        )}
        {/* <LogoLink href="/">
          <Logo />
        </LogoLink> */}
        <Ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/share">Sharing</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </Ul>
      </Nav>
    </Footer>
  )
}
