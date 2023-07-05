import Link from 'next/link'
import styled from 'styled-components'
import { getScriptFontData } from '~/configurations'

type ButtonContainerPropsType = {
  horizontal?: boolean
}

export const ButtonContainer = styled.div<ButtonContainerPropsType>(
  props => ({
    alignItems: 'center',
    display: 'flex',
    flexDirection: props.horizontal ? 'row' : 'column',
    gap: 16,
    justifyContent: 'center',
    padding: 16,
  }),
)

const Button = styled.button<LabelButtonPropsType>(props => ({
  background: props.theme.colors.purple,
  borderRadius: 4,
  color: getScriptFontData(props.theme, 'latin').loaded
    ? `${props.theme.colors.white} !important`
    : 'transparent',
  cursor: 'pointer',
  fontFamily: 'Noto Sans Mono',
  fontSize: 16,
  lineHeight: 1.7,
  opacity: props.disabled ? 0.5 : 1,
  padding: '8px 16px',
  transition: 'opacity 0.2s',
}))

type LabelButtonPropsType = {
  disabled?: boolean
  minWidth?: number | string
}

export const LabelButton = styled.label<LabelButtonPropsType>(
  props => ({
    background: props.theme.colors.purple,
    borderRadius: 4,
    color: getScriptFontData(props.theme, 'latin').loaded
      ? `${props.theme.colors.white} !important`
      : 'transparent',
    cursor: 'pointer',
    fontFamily: 'Noto Sans Mono',
    fontSize: 16,
    lineHeight: 1.7,
    minWidth: props.minWidth,
    opacity: props.disabled ? 0.5 : 1,
    padding: '8px 16px',
    pointerEvents: props.disabled ? 'none' : undefined,
    textAlign: 'center',
    transition: 'opacity 0.2s',
    width: 'fit-content',
  }),
)

type LinkButtonPropsType = LabelButtonPropsType & {
  small?: boolean
}

export const LinkButton = styled(Link)<LinkButtonPropsType>(props => ({
  borderBottom: 'none !important',
  borderRadius: 4,
  color: getScriptFontData(props.theme, 'latin').loaded
    ? `${props.theme.colors.purple} !important`
    : 'transparent',
  cursor: 'pointer',
  fontFamily: 'Noto Sans Mono',
  fontSize: props.small ? 12 : 16,
  lineHeight: 1.7,
  opacity: props.disabled ? 0.5 : 1,
  padding: `${props.small ? 2 : 8}px 16px`,
  textAlign: 'center',
  transition: 'opacity 0.2s',
  width: 'fit-content',
}))

export default Button
