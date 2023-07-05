import styled from 'styled-components'

const Error = styled.p(props => ({
  background: props.theme.colors.yellow,
  borderRadius: 4,
  color: props.theme.colors.black,
  padding: 16,
}))

export default Error
