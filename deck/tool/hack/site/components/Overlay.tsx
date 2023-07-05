import { Box } from '@lancejpollard/kit'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import theme from '~/configurations/theme'

type OverlayPropsType = {
  children: React.ReactNode
  onClose?: () => void
}

const Container = styled.div({
  animation: theme.animations.fadeIn('0.3s'),
  background: 'rgba(30, 30, 30, 0.8)',
  bottom: 0,
  height: '100%',
  opacity: 1,
  padding: 16,
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000,
})

const Content = Box({
  align: 'center' as const,
  height: '100%',
  justify: 'center' as const,
  width: '100%',
})

export default function Overlay({
  children,
  onClose,
}: OverlayPropsType) {
  const [shown, setShown] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShown(false)
        onClose?.()
      }
    }

    window.addEventListener('keyup', handleKeyUp)

    return () => {
      document.body.style.overflow = 'initial'

      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [onClose])

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShown(false)
      onClose?.()
    }
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    setShown(false)
    onClose?.()
  }

  return createPortal(
    <Container onClick={handleClick}>
      <Content
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {children}
      </Content>
    </Container>,
    document.querySelector('#overlay') ?? document.createElement('div'),
  )
}
