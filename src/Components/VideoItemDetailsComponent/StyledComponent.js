import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const IconContainer = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
  background-color: transparent;
  border: 0px none;
  color: ${props => props.color};
`

export const ViewsText = styled.p`
  color: ${props => props.color};
  font-family: Roboto;
  font-size: 18px;
  font-weight: 700;
  margin-top: 30px;
`
export const VideoFailureContainer = styled.div`
  background-color: hsla(50, 33%, 25%, 0.75);
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const VideoFailureHeading = styled.h1`
  color: #323f4b;
  font-weight: 700;
  font-family: 'Roboto';
`
export const VideoFailureParagraph = styled.p`
  color: #323f4b;
  font-weight: 700;
  font-family: 'Roboto';
`
export const VideoFailureButton = styled.button`
  color: #ffffff;
  border-radius: 5px;
  font-size: 20px;
  font-family: 'Roboto';
  border-width: 0px;
  cursor: pointer;
  outline: none;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 5px;
  font-weight: 700;
  background-color: #3b82f6;
`

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  align-items: center;
  background-color: #fff;
`

export const Image = styled.img`
  width: 300px;
  margin: 20px;
`

export const Heading = styled.h1`
  color: black;
  text-align: center;
  font-size: 30px;
`

export const Desc = styled.p`
  color: black;
  text-align: center;
  font-size: 20px;
`

export const NavLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1e293b;
  text-decoration: none;
  margin-bottom: 32px;
`

export const Retry = styled.button`
  padding: 15px;
  color: blue;
  cursor: pointer;
`
