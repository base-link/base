import React from 'react'
import styled from 'styled-components'
import theme from '../configurations/theme'
import { getScriptFontData } from '~/configurations'

const InputContainer = styled.div({
  maxWidth: 720,
  textAlign: 'center',
  width: '100%',
  zIndex: 10,
})

export const InputList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '16px 0px',
})

const InputText = styled.input(props => ({
  background: props.theme.colors.greenLight,
  borderRadius: 0,
  boxShadow: theme.shadows.one,
  color: getScriptFontData(props.theme, 'latin').loaded
    ? props.theme.colors.black
    : 'transparent',
  display: 'block',
  fontFamily: 'Noto Sans Mono',
  lineHeight: 1.7,
  padding: 16,
  width: '100%',
}))

type TextInputPropsType = {
  defaultValue?: string
  max?: number
  min?: number
  onInput: (value: string) => void
  pattern?: string
  placeholder?: string
  step?: number
  type?: string
}

export default React.forwardRef(function TextInput(
  {
    placeholder,
    onInput,
    defaultValue,
    type = 'text',
    min,
    max,
    step,
    pattern,
  }: TextInputPropsType,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    onInput((e.target as HTMLInputElement).value)
  }

  return (
    <InputContainer>
      <InputText
        ref={ref}
        className="input"
        placeholder={placeholder}
        onInput={handleInput}
        defaultValue={defaultValue}
        type={type}
        min={min}
        max={max}
        step={step}
        pattern={pattern}
      />
    </InputContainer>
  )
})
