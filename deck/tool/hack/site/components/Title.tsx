import React, { useEffect, useState } from 'react'
import Type from './Type'
import styled from 'styled-components'
import theme from '~/configurations/theme'
import _ from 'lodash'
import FA from './FA'
import Button, { LinkButton } from './Button'

type PropsType = {
  author?: string
  back?: string
  bold?: boolean
  config?: React.ReactNode
  date?: string
  details?: React.ReactNode
  id?: string
  tab?: string
  title?: React.ReactNode
  type?: string
  url: string
}

const Header = styled.header(props => ({
  a: {
    borderBottom: 'none !important',
    fontSize: 32,
    textDecoration: 'none',
  },
  h1: {
    fontSize: 32,
    fontWeight: 'normal',
    lineHeight: 1.7,
    margin: 0,
    marginBottom: 32,
    marginTop: -16,
    paddingLeft: 16,
    paddingRight: 16,
    whiteSpace: 'pre-line',
  },
  maxWidth: 720,
  paddingTop: 80,
  textAlign: 'center',
}))

const Date = styled.div({
  fontFamily: 'Noto Sans Mono',
  fontSize: 12,
  lineHeight: 1.7,
  textAlign: 'center',
})

const Author = styled.div({
  fontFamily: 'Noto Sans Mono',
  fontSize: 16,
  lineHeight: 1.7,
  marginBottom: 8,
  marginTop: 8,
  textAlign: 'center',
})

const H1Span = styled.span(props => ({
  color: props.theme.colors.black3,
  display: 'block',
  fontSize: 24,
  paddingLeft: props.theme.isMobile ? 16 : 48,
  paddingRight: props.theme.isMobile ? 16 : 48,
}))

export default function Title({
  title,
  tab,
  date,
  author,
  details,
  bold = false,
}: PropsType) {
  const actualTitle = tab ?? title
  const potentiallyBoldTitle = bold ? (
    <strong>{actualTitle}</strong>
  ) : (
    actualTitle
  )

  return (
    <Header>
      <h1>
        <Type
          size={32}
          text={potentiallyBoldTitle ?? ''}
        />
        {author && <Author>by {author}</Author>}
        {date && <Date>c. {date}</Date>}
        {details && <H1Span>{details}</H1Span>}
      </h1>
    </Header>
  )
}
