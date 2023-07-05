import React from 'react'
import Image from 'next/image'
import theme from '~/configurations/theme'

type PropsType = {
  alt?: string
  h: number
  host: string
  onClick?: () => void
  preview: string
  src: string
  w: number
}

export default function GHImage({
  host,
  src,
  preview,
  w,
  h,
  alt = '',
  onClick,
}: PropsType) {
  const actualSrc = `https://${host}/${src}`
  return (
    <Image
      onClick={onClick}
      style={{
        borderRadius: 4,
        boxShadow: theme.shadows.thick,
        height: 'auto',
        width: '100%',
      }}
      alt={alt}
      placeholder="blur"
      blurDataURL={preview}
      width={w}
      height={h}
      src={actualSrc}
    />
  )
}
