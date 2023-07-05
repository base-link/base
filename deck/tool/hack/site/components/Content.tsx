/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getScriptFontData } from '~/configurations'

export const BlockQuote = styled.blockquote(props => ({
  background: props.theme.colors.white2,
  borderRadius: 4,
  color: getScriptFontData(props.theme, 'latin').loaded
    ? props.theme.colors.black
    : 'transparent',
  fontFamily: 'Noto Sans Mono',
  lineHeight: 1.7,
  marginBottom: 24,
  maxWidth: 720,
  padding: '12px 0px 8px 0px',
  width: '100%',
}))

export const Code = styled.code(props => ({
  background: props.theme.colors.white3,
  color: getScriptFontData(props.theme, 'latin').loaded
    ? props.theme.colors.black
    : 'transparent',
  fontFamily: 'Noto Sans Mono',
  padding: '0px 6px',
}))

export const H1 = styled.h1(props => ({
  background: !getScriptFontData(props.theme, 'latin').loaded
    ? props.theme.colors.white2
    : undefined,
  color: getScriptFontData(props.theme, 'latin').loaded
    ? props.theme.colors.black
    : 'transparent',
  fontFamily: 'Noto Sans Mono',
  fontSize: 32,
  fontWeight: 'normal',
  lineHeight: 1.7,
  margin: 0,
  marginBottom: 32,
  marginTop: 16,
  maxWidth: 720,
  paddingLeft: 16,
  paddingRight: 16,
  textAlign: 'center',
  width: '100%',
}))

export const H2 = styled.h2(props => ({
  background: props.theme.colors.white2,
  color: getScriptFontData(props.theme, 'latin').loaded
    ? props.theme.colors.black
    : 'transparent',
  fontFamily: 'Noto Sans Mono',
  fontSize: 28,
  fontWeight: 'normal',
  lineHeight: 1.7,
  margin: 0,
  marginBottom: 16,
  marginTop: 16,
  maxWidth: 720,
  paddingBottom: 8,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 16,
  width: '100%',
}))

export const H3 = styled.h3(props => ({
  background: props.theme.colors.white3,
  color: getScriptFontData(props.theme, 'latin').loaded
    ? props.theme.colors.black
    : 'transparent',
  fontFamily: 'Noto Sans Mono',
  fontSize: 24,
  fontWeight: 'normal',
  lineHeight: 1.7,
  margin: 0,
  marginBottom: 16,
  marginTop: 8,
  maxWidth: 720,
  paddingBottom: 8,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 16,
  width: '100%',
}))

export function H3Link({ href, children }: H3LinkPropsType) {
  return (
    <H3LinkContainer>
      <H3LinkImpl href={href}>
        <span>{children}</span>
        <span>▶</span>
      </H3LinkImpl>
    </H3LinkContainer>
  )
}

export const Ol = styled.ol(props => ({
  li: {
    background: !getScriptFontData(props.theme, 'latin').loaded
      ? props.theme.colors.white2
      : undefined,
    color: getScriptFontData(props.theme, 'latin').loaded
      ? props.theme.colors.black
      : 'transparent',
    display: 'list-item',
    fontFamily: 'Noto Sans Mono',
    fontSize: '16px',
    lineHeight: 1.7,
    listStylePosition: 'inside',
    marginBottom: 4,
  },
  listStyleType: 'decimal',
  marginTop: 4,
  maxWidth: 670,
  width: '100%',
}))

export const P = styled.p(props => ({
  '*': {
    lineHeight: 1.7,
  },
  background: !getScriptFontData(props.theme, 'latin').loaded
    ? props.theme.colors.white2
    : undefined,
  color: getScriptFontData(props.theme, 'latin').loaded
    ? props.theme.colors.black
    : 'transparent',
  fontFamily: 'Noto Sans Mono',
  fontSize: '16px',
  lineHeight: 1.7,
  marginTop: 8,
  maxWidth: 720,
  paddingLeft: 16,
  paddingRight: 16,

  width: '100%',
}))

type TablePropsType = {
  rightLast?: boolean
}

export const Pre = styled.pre(props => ({
  background: props.theme.colors.black,
  borderRadius: 0,
  code: {
    background: props.theme.colors.black,
    color: getScriptFontData(props.theme, 'latin').loaded
      ? props.theme.colors.white2
      : `transparent !important`,
  },
  // boxShadow: `0 13px 27px -5px rgb(50 50 93 / 25%), 0 8px 16px -8px rgb(0 0 0 / 30%), 0 -6px 16px -6px rgb(0 0 0 / 3%)`,
  color: getScriptFontData(props.theme, 'latin').loaded
    ? props.theme.colors.white2
    : `transparent !important`,
  fontFamily: 'Noto Sans Mono',
  fontSize: '16px',
  lineHeight: 1.7,
  marginBottom: 24,
  marginTop: '16px',
  maxWidth: 720,
  padding: '16px 16px',
  whiteSpace: 'pre',
  width: '100%',
}))

export const Table = styled.table<TablePropsType>(props => ({
  height: 1 /* Will be ignored, don't worry. */,
  maxWidth: 720,
  overflowY: 'auto',
  'tbody td': {
    borderLeft: `4px solid ${props.theme.colors.white4}`,
    fontFamily: 'Noto Sans Mono',
    lineHeight: 1.7,
    // padding: '12px 16px',
  },
  'tbody td[align="center"]': {
    textAlign: 'center',
  },
  'tbody td[align="center"] *': {
    textAlign: 'center',
  },
  'tbody td[align="right"]': {
    textAlign: 'right',
  },
  'tbody td[align="right"] *': {
    display: 'block',
    textAlign: 'right',
  },
  'tbody td[align="right"] a': {
    borderBottom: 'none',
    display: 'block',
  },
  'tbody td[align="right"] a:hover': {
    borderBottom: 'none',
  },
  'tbody tr td:first-child': {
    borderLeft: 'none',
  },
  'tbody tr td:last-child': {
    textAlign: props.rightLast ? 'right' : 'left',
  },
  'tbody tr:nth-child(2n)': {
    background: props.theme.colors.white2,
  },
  td: { height: '100%' },
  'td > *': { height: '100%' },
  'thead th': {
    background: props.theme.colors.white3,
    borderLeft: `4px solid ${props.theme.colors.white4}`,
    fontFamily: 'Noto Sans Mono',
    fontWeight: 'bold',
    lineHeight: 1.7,
    // padding: '12px 16px',
    textAlign: 'left',
  },
  'thead th:first-child': {
    borderLeft: 'none',
  },
  'thead th:last-child': {
    textAlign: props.rightLast ? 'right' : 'left',
  },
  tr: { height: '100%' },
  width: '100%',
}))

export const TableCell = styled.td({
  padding: '12px 16px',
})

const H3LinkContainer = styled.h3(props => ({
  background: props.theme.colors.white3,
  color: getScriptFontData(props.theme, 'latin').loaded
    ? props.theme.colors.black
    : 'transparent',
  fontFamily: 'Noto Sans Mono',
  fontSize: 24,
  fontWeight: 'normal',
  lineHeight: 1.7,
  margin: 0,
  marginBottom: 16,
  marginTop: 8,
  maxWidth: 720,
  width: '100%',
}))

const H3LinkImpl = styled(Link)(props => ({
  ':hover span': {
    color: props.theme.colors.purpleLight,
  },
  borderBottom: 'none !important',
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: 8,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 16,
}))

type H3LinkPropsType = {
  children: React.ReactNode
  href: string
}

export const TableCellContent = styled.div({
  padding: '12px 16px',
})

export function TableCellLink({
  href,
  children,
}: TableCellLinkPropsType) {
  return (
    <TableCellLinkContainer href={href}>
      <TableCellLinkText>{children}</TableCellLinkText>
    </TableCellLinkContainer>
  )
}

export const TableCellLinkText = styled.span(props => ({
  borderBottom: `1px dotted ${props.theme.colors.black}`,
}))

type TableCellLinkPropsType = {
  children: React.ReactNode
  href: string
}

export const TableScroller = styled.div(props => ({
  borderBottom: `4px solid ${props.theme.colors.white4}`,
  marginBottom: 32,
  marginTop: 16,
  maxHeight: '100vh',
  maxWidth: 720,
  overflowX: 'auto',
  th: {
    position: 'sticky',
    top: 0,
    zIndex: 2,
  },
  width: '100%',
}))

export const Ul = styled.ul(props => ({
  li: {
    background: !getScriptFontData(props.theme, 'latin').loaded
      ? props.theme.colors.white2
      : undefined,
    color: getScriptFontData(props.theme, 'latin').loaded
      ? props.theme.colors.black
      : 'transparent',
    display: 'list-item',
    fontFamily: 'Noto Sans Mono',
    fontSize: '16px',
    lineHeight: 1.7,
    marginBottom: 4,
    paddingLeft: 24,
  },
  'li:before': {
    content: "'*'",
    fontFamily: 'text',
    left: 0,
    position: 'absolute',
    top: 5,
  },
  listStyleType: 'none',
  marginTop: 4,
  maxWidth: 720,
  width: '100%',
}))

// eslint-disable-next-line sort-exports/sort-exports
export const TableCellLinkContainer = styled(Link)(props => ({
  alignItems: 'center',
  borderBottom: 'none !important',
  display: 'flex',
  padding: '12px 16px',
  [`:hover ${TableCellLinkText}`]: {
    borderBottom: `1px dotted ${props.theme.colors.purple}`,
    color: props.theme.colors.purple,
  },
}))

export const TableHeader = styled.th({
  padding: '12px 16px',
})

export default function Content() {
  return <div />
}
