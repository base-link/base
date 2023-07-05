import React, { useState } from 'react'
import { Box } from '@lancejpollard/kit'
import GHImage from './GHImage'
import styled from 'styled-components'
import LICENSES from '~/configurations/licenses'
import useViewportDimensions from '~/hooks/useViewportDimensions'
import theme from '~/configurations/theme'
import Overlay from './Overlay'

export type ImageAssetType = {
  h: number
  host: string
  src: string
  w: number
}

export type ImageType = {
  alt?: string
  author: string
  authorLink: string
  license: keyof typeof LICENSES
  preview: string
  sizes: Record<string, ImageAssetType>
}

type PropsType = ImageType & {
  maxWidth?: string | number
  overlay?: boolean
  small?: boolean
}

type ContainerPropsType = {
  overlay: boolean
}

const Container = styled.figure<ContainerPropsType>(props => ({
  borderRadius: 4,
  display: 'block',
  maxWidth: 720,
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  ...(props.overlay
    ? {
        ':hover figcaption': {
          opacity: 0.9,
        },
        figcaption: {
          opacity: 0,
        },
      }
    : {}),
}))

type CaptionPropsType = {
  absolute?: boolean
  overlay: boolean
}

const Caption = styled.figcaption<CaptionPropsType>(props => ({
  a: {
    display: 'inline',
  },
  fontSize: 12,
  fontStyle: 'italic',
  maxHeight: 'calc(100% - 32px)',
  overflow: 'auto',
  p: {
    marginBottom: '4px !important',
  },
  'p:first-of-type': {
    marginTop: 8,
  },
  paddingBottom: 4,
  span: {
    display: 'inline',
  },
  textAlign: 'right',
  width: '100%',
  ...(props.overlay
    ? {
        a: {
          borderBottomColor: `${theme.colors.white2} !important`,
          display: 'inline',
        },
        background: theme.colors.black2,
        bottom: 0,
        color: theme.colors.white2,
        position: props.absolute ? 'absolute' : undefined,
        transition: 'opacity 0.3s ease-in-out',
      }
    : {}),
}))

const AuthorLink = Box({})

const License = Box({
  as: 'a',
})

const Content = styled.p({
  fontFamily: 'Noto Sans Mono',
  lineHeight: 1.5,
  overflowWrap: 'break-word',
  padding: '8px 16px',
  whiteSpace: 'pre-line',
  wordBreak: 'break-word',
})

const OverlayScroll = Box({
  display: 'block',
  grow: true,
  maxHeight: '100%',
  maxWidth: 1024,
  scrollY: true,
  shrink: true,
})

const ImageContainer = styled.div({
  width: '100%',
})

export default function Figure({
  sizes,
  preview,
  license,
  authorLink,
  author,
  alt = '',
  small = false,
  maxWidth,
  overlay = false,
}: PropsType) {
  const licenseInfo = LICENSES[license]
  const dimensions = useViewportDimensions()
  const [showOverlay, setShowOverlay] = useState(false)

  let sizeInfo: ImageAssetType = sizes.original

  if (small) {
    sizeInfo = sizes[256] ?? sizes.original
  } else if (dimensions.width <= 500) {
    sizeInfo = sizes[1024] ?? sizes.original
  } else if (dimensions.width <= 2400) {
    sizeInfo = sizes[2048] ?? sizes.original
  }

  let largeSizeInfo: ImageAssetType = sizes[2048] ?? sizes.original

  const handleImageClick = (): void => {
    setShowOverlay(true)
  }

  const handleCloseOverlay = (): void => {
    setShowOverlay(false)
  }

  const renderCaption = (o: boolean, absolute: boolean) => {
    return (
      <Caption
        overlay={o}
        absolute={absolute}
      >
        <Content>
          {alt}
          {alt ? '\n' : ''}
          {author ? (
            authorLink ? (
              <>
                by{' '}
                <AuthorLink
                  as="a"
                  target="_blank"
                  rel="nofollow"
                  href={authorLink}
                >
                  {author}
                </AuthorLink>
              </>
            ) : (
              <>
                by <AuthorLink as="span">{author}</AuthorLink>
              </>
            )
          ) : undefined}
          {licenseInfo && (
            <>
              {'\n'}
              <License
                href={licenseInfo.link}
                target="_blank"
                rel="nofollow"
              >
                {licenseInfo.abbr}
              </License>
            </>
          )}
        </Content>
      </Caption>
    )
  }

  return (
    <Container
      overlay={overlay}
      style={{ maxWidth }}
    >
      {showOverlay && (
        <Overlay onClose={handleCloseOverlay}>
          <OverlayScroll>
            <ImageContainer>
              <GHImage
                host={largeSizeInfo.host}
                src={largeSizeInfo.src}
                preview={preview}
                w={largeSizeInfo.w}
                h={largeSizeInfo.h}
                alt={alt}
              />
            </ImageContainer>
            {renderCaption(true, false)}
          </OverlayScroll>
        </Overlay>
      )}
      <GHImage
        host={sizeInfo.host}
        src={sizeInfo.src}
        preview={preview}
        w={sizeInfo.w}
        h={sizeInfo.h}
        alt={alt}
        onClick={handleImageClick}
      />
      {renderCaption(overlay, overlay)}
    </Container>
  )
}
