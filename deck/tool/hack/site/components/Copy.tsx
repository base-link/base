import theme from '~/configurations/theme'
import styled from 'styled-components'

const Copy = styled.div({
  '*': {
    fontFamily: 'text',
    fontSize: 16,
    lineHeight: 1.4,
  },
  a: {
    borderBottom: `1px dotted black`,
  },
  'a:hover': {
    borderBottom: `1px dotted ${theme.colors.red}`,
  },
  li: {
    marginLeft: 12,
    textIndent: -11,
  },
  ol: {
    marginBottom: 32,
  },
  'ol * ol': {
    marginBottom: 0,
  },
  'ol * ul': {
    marginBottom: 0,
  },
  ul: {
    marginBottom: 32,
  },
  'ul * ol': {
    marginBottom: 0,
  },
  'ul * ul': {
    marginBottom: 0,
  },
})

export default Copy
