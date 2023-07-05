import React, { useEffect } from 'react'
import NextHead from 'next/head'

type PropsType = {
  host: string
  icon?: string
  image?: string
  note?: string
  site: string
  stylesheets?: Array<string>
  tags?: Array<string>
  title: string
  twitterCreatorHandle?: string
  twitterHandle?: string
  url: string
}

export default function Head({
  title,
  note,
  tags = [],
  url,
  icon,
  host,
  image,
  site,
  twitterHandle,
  twitterCreatorHandle,
  stylesheets,
}: PropsType) {
  useEffect(() => {
    if (title) {
      document.title = title
    }
  }, [title])

  return (
    <NextHead>
      <title>{title}</title>
      <meta
        name="description"
        content={note}
      />
      <meta
        name="keywords"
        content={tags.join(', ')}
      />
      {icon && (
        <link
          rel="icon"
          href={icon}
        />
      )}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta
        name="apple-mobile-web-app-capable"
        content="yes"
      />
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:url"
        content={`${host}${url}`}
      />
      <meta
        property="og:description"
        content={note}
      />
      {image && (
        <meta
          property="og:image"
          content={image}
        />
      )}
      <meta
        property="og:site_name"
        content={site}
      />
      <meta
        property="og:locale"
        content="en_US"
      />
      <meta
        property="og:type"
        content="article"
      />
      {/* <meta
        property="fb:app_id"
        content="1953189875070105"
      /> */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        name="twitter:title"
        content={title}
      />
      <meta
        name="twitter:description"
        content={note}
      />
      <meta
        name="twitter:site"
        content={`@${twitterHandle}`}
      />
      {image && (
        <meta
          name="twitter:image"
          content={image}
        />
      )}
      <meta
        name="twitter:creator"
        content={twitterCreatorHandle}
      />
      {Boolean(stylesheets?.length) &&
        stylesheets?.map((href, i) => (
          <link
            key={`${href}-${i}`}
            rel="stylesheet"
            href={href}
          />
        ))}
    </NextHead>
  )
}
