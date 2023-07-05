import { AppConfiguration } from '~/configurations'

declare module 'color-space'

declare module '*.md'

declare module '*.glsl' {
  const content: string
  export default content
}

declare module './hooks/useConfiguration' {
  interface Configuration extends AppConfiguration {}
}

declare module 'styled-components' {
  interface DefaultTheme extends AppConfiguration {}
}
