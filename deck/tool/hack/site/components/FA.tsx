import React from 'react'
import styled from 'styled-components'

type PropsType = {
  color?: string
  lineHeight?: number
  name: string
  size?: number | string
}

type IconPropsType = {
  color?: string
  lineHeight?: number
  size?: number | string
}

const Icon = styled.i<IconPropsType>(props => ({
  color: props.color,
  fontSize: props.size,
  lineHeight: props.lineHeight ?? 1,
}))

export default function FA({ name, size, ...props }: PropsType) {
  return (
    <Icon
      {...props}
      className={`icon-${name}`}
      size={size}
    />
  )
}
