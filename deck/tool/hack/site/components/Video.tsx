import YoutubeVideo from 'react-lite-youtube-embed'
import React from 'react'
import styled from 'styled-components'

const Caption = styled.p({
  fontFamily: 'Noto Sans Mono',
  fontSize: 12,
  lineHeight: 1.5,
  overflowWrap: 'break-word',
  padding: '8px 16px',
  textAlign: 'right',
  whiteSpace: 'pre-line',
  wordBreak: 'break-word',
})

const Container = styled.div({
  '.yt-lite': {
    width: '100%',
  },
  iframe: {
    zIndex: 1000,
  },
  maxWidth: 720,
  width: '100%',
})

type VideoPropsType = {
  id: string
  title: string
}

export default function Video({ id, title }: VideoPropsType) {
  return (
    <Container>
      <YoutubeVideo
        id={id}
        title={title}
      />
      <Caption>{title}</Caption>
    </Container>
  )
}
