import React from 'react'
import styled from 'styled-components'

type ScreenPropsType = {
  type: string
}

const Icon = styled.i({
  aspectRatio: '1 / 1',
  display: 'block',
  width: '100%',
})

export default function GG({ type, ...props }: ScreenPropsType) {
  return (
    <Icon
      className={`gg-${type}`}
      {...props}
    />
  )
}
