/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'
import theme from '~/configurations/theme'
import { PageInfoType } from '~/utils/types'

export const config = {
  runtime: 'edge',
}

// Make sure the font exists in the specified path:
const font = fetch(
  new URL(
    '../../../public/fonts/NotoSansMono-Regular.ttf',
    import.meta.url,
  ),
).then(res => res.arrayBuffer())

export default async function handler({ url }: NextRequest) {
  const fontData = await font
  const parsedUrl = new URL(url)
  const generateUrl = (path: string): string => {
    const full = [parsedUrl.hostname, parsedUrl.port].join(':')
    return `${parsedUrl.protocol}//${full}${path}`
  }

  let path = (parsedUrl.searchParams.get('path') ?? '/')
    .replace(/^\//, '')
    .replace(/\/$/, '')
  let page: PageInfoType

  if (!path) {
    path = 'index'
  }

  try {
    page = (await import(`../../../configurations/pages/${path}.ts`))
      .default
  } catch (e) {
    try {
      page = (
        await import(`../../../configurations/pages/${path}/index.ts`)
      ).default
    } catch (e2) {}
  }

  page ??= {
    image: undefined,
    tab: 'Something',
    url,
  }

  const content = (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"text"',
        fontSize: 48,
        height: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <img
        src={
          page.image
            ? generateUrl(page.image)
            : generateUrl(theme.images.logo.sketch)
        }
        height={380}
        alt="Tune logo"
      />
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: '"Noto Sans Mono"',
          fontSize: 48,
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"Noto Sans Mono"',
            gap: 8,
            marginTop: 32,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: '"Noto Sans Mono"',
              fontSize: 48,
              lineHeight: 1,
              width: '100%',
            }}
          >
            {page.tab}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: '"Noto Sans Mono"',
              fontSize: 24,
              lineHeight: 1.7,
              width: '100%',
            }}
          >
            lop
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: '"Noto Sans Mono"',
              fontSize: 32,
              width: '100%',
            }}
          >
            him
          </div>
        </div>
      </div>
    </div>
  )

  try {
    return new ImageResponse(content, {
      fonts: [
        {
          data: fontData,
          name: 'Noto Sans Mono',
          style: 'normal',
        },
      ],
      height: 640,
      width: 1280,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e instanceof Error) {
      console.log(`${e.stack}`)
      return new Response(`Failed to generate the image`, {
        status: 500,
      })
    }
  }
}
