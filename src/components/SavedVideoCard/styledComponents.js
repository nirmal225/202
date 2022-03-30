import styled from 'styled-components'

export const VideoHeading = styled.h1`
  font-size: 17px;
  font-weight: 500;
  box-sizing: border-box;
  color: ${props => (props.dark ? '#f9f9f9' : '#1e293b')};
`
export const ChannelName = styled.p`
  font-size: 17px;
  color: #7e858e;
  margin: 0;
  box-sizing: border-box;
`

export const ViewsAndTimeContainer = styled.div`
  display: flex;
  width:50%
  align-items: center;
  box-sizing:border-box;
  color: #7e858e;
`
