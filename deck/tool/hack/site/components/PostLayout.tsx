/* eslint-disable @typescript-eslint/no-explicit-any */
import { PagePropsType } from '@lancejpollard/kit'
import Layout from './Layout'
import React, { useEffect } from 'react'

export type PostLayoutPropsType = PagePropsType & {
  author?: string
  background?: string
  children: React.ReactNode
  stylesheets?: Array<string>
  title?: string
}

const scrollToHash = (): void => {
  if (typeof window !== 'undefined') {
    // Get the hash from the url
    const hashId = window.location.hash

    if (hashId) {
      // Use the hash to find the first element with that id
      const element = document.querySelector(hashId)

      if (element) {
        // Smooth scroll to that elment
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
      }
    }
  }
}

export default function PostLayout({
  url,
  tab,
  title,
  author,
  tags = [],
  note,
  children,
  background,
  stylesheets,
}: PostLayoutPropsType) {
  let actualTab: string = ''

  if (title) {
    const parts: Array<string> = []
    parts.push(title)
    if (author) {
      parts.push(`by`, author)
    }
    actualTab = parts.join(' ')
  } else {
    actualTab = tab
  }

  useEffect(scrollToHash)

  return (
    <Layout
      url={url}
      tab={actualTab}
      note={note}
      tags={tags}
      stylesheets={stylesheets}
    >
      {children}
    </Layout>
  )
}
