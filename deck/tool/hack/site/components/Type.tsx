import styled, { StyledComponent, useTheme } from 'styled-components'
import React from 'react'
import FONT_LOADERS from '~/configurations/fonts'
import { Property } from 'csstype'
import { Configuration } from '~/hooks/useConfiguration'
import { getScriptFontData } from '~/configurations'

type TypePropsType = {
  align?: Property.TextAlign
  as?: string
  block?: boolean
  bold?: boolean
  direction?: Property.Direction | undefined
  size?: number
  text?: React.ReactNode
  title?: string
  type?: string
}

type SpanBasePropsType = {
  align?: Property.TextAlign
  block?: boolean
  bold?: boolean
  direction?: Property.Direction
  font: string
  visible: boolean
}

const SpanBase = styled.span<SpanBasePropsType>(props => ({
  animation: !props.visible
    ? props.theme.animations.flicker
    : undefined,
  background: !props.visible ? props.theme.colors.white3 : undefined,
  color: !props.visible ? 'transparent' : undefined,
  direction: props.direction,
  display: props.block ? 'block' : undefined,
  fontFamily: `${props.font
    .split(/\s*,\s*/)
    .map(x => (x.match(/\s/) ? `'${x}'` : x))
    .join(', ')} !important`,
  fontWeight: props.bold ? 'bold' : 'normal',
  overflowWrap: 'break-word',
  textAlign: props.align,
}))

type SpanPropsType = SpanBasePropsType & {
  size: number
}

const SPANS: Record<
  keyof typeof FONT_LOADERS,
  StyledComponent<typeof SpanBase, Configuration>
> = {
  amharic: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  arabic: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  armenian: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  bengali: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  canadian: styled(SpanBase)<SpanPropsType>(props => ({
    fontFamily:
      "'Noto Sans Canadian Aboriginal', sans-serif !important",
    fontSize: props.size * 1.4,
  })),
  chinese: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  cuneiform: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  devanagari: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  egyptian: styled(SpanBase)<SpanPropsType>(props => ({
    fontFamily:
      "'Noto Sans Egyptian Hieroglyphs', sans-serif !important",
    fontSize: props.size * 1.4,
  })),
  georgian: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  gujarati: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  gurmukhi: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  hebrew: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  inuktitut: styled(SpanBase)<SpanPropsType>(props => ({
    fontFamily:
      "'Noto Sans Canadian Aboriginal', sans-serif !important",
    fontSize: props.size * 1.4,
  })),
  japanese: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  kannada: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  khmer: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  korean: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  latin: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1,
  })),
  malayalam: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  oriya: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  runic: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  sanskrit: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  sinhala: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  syriac: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  tamil: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  telugu: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  thai: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  tibetan: styled(SpanBase)<SpanPropsType>(props => ({
    fontSize: props.size * 1.4,
  })),
  tone: styled(SpanBase)<SpanPropsType>(props => ({
    fontFamily: 'ToneEtch !important',
    fontSize: props.size * 1.4,
    // paddingBottom: props.size * 0.3,
    // ':hover': {
    // },
    // paddingTop: props.size * 0.3,
  })),
}

export default function Type({
  type = 'latin',
  size = 16,
  title,
  text,
  bold,
  block = false,
  direction,
  align,
}: TypePropsType) {
  const theme = useTheme()
  const actualType = SPANS[type] ? type : 'latin'
  const Span = SPANS[actualType]
  const fontData = getScriptFontData(theme, actualType)
  return (
    <Span
      title={title}
      size={size}
      visible={fontData.loaded ?? false}
      font={fontData.name}
      bold={bold}
      block={block}
      direction={direction}
      align={align}
    >
      {text}
    </Span>
  )
}
