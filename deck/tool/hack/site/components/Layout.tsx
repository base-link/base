/* eslint-disable @typescript-eslint/no-explicit-any */
import { PagePropsType } from '@lancejpollard/kit'
import theme from '~/configurations/theme'
import React from 'react'
import _ from 'lodash'
import Head from './Head'

type LayoutPropsType = PagePropsType & {
  children: React.ReactNode
  fonts?: Array<string>
  stylesheets?: Array<string>
}

export default function Layout({
  url,
  tab,
  note,
  tags,
  children,
  stylesheets,
}: LayoutPropsType) {
  return (
    <>
      <Head
        url={url}
        title={tab}
        note={note}
        tags={tags}
        icon={theme.images.logo.icon}
        host="https://base.link"
        // image={`https://base.link/api/social?path=${url}`}
        site="Base Link"
        twitterHandle="@tunebond"
        twitterCreatorHandle="@tunebond"
        stylesheets={stylesheets}
      />
      {children}
    </>
  )
}
