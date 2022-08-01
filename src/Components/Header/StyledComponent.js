import styled from 'styled-components'

export const NavContainer = styled.nav`
 background-color: ${props => props.bgColor};
  padding-left: 12px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 12px;'
  display: flex;
  justify-content: space-between;
`

export const ThemeButton = styled.button`
  background-color: transparent;
  border-width: 0px;
  cursor: pointer;
  outline: none;
`
