import colors from '~/configurations/colors'
import animations from '~/configurations/animations'
import images from '~/configurations/images'
import anchors from '~/configurations/anchors'
import gradients from '~/configurations/gradients'
import shadows from '~/configurations/shadows'

export type AppTheme = typeof theme

const theme: ThemeType = {
  anchors,
  animations,
  colors,
  gradients,
  images,
  isMobile: true,
  shadows,
}

export type ThemeType = {
  anchors: typeof anchors
  animations: typeof animations
  colors: typeof colors
  gradients: typeof gradients
  images: typeof images
  isMobile: boolean
  shadows: typeof shadows
}

export default theme
