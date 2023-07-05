import styled from 'styled-components'

const Prelude = styled.span(props => ({
  color: props.theme.colors.black3,
  display: 'block',
  fontSize: 24,
  lineHeight: 1.7,
  paddingLeft: props.theme.isMobile ? 16 : 48,
  paddingRight: props.theme.isMobile ? 16 : 48,
}))

const Title = styled.span(props => ({
  color: props.theme.colors.black,
  display: 'block',
  fontSize: 32,
  fontWeight: 'bold',
  lineHeight: 1.7,
}))

const H2 = styled.h2({
  display: 'flex',
  flexDirection: 'column',
})

type SubtitleWithPreludePropsType = {
  prelude: React.ReactNode
  title: React.ReactNode
}

export function SubtitleWithPrelude({
  title,
  prelude,
}: SubtitleWithPreludePropsType) {
  return (
    <H2>
      <Prelude>{prelude}</Prelude>
      <Title>{title}</Title>
    </H2>
  )
}
