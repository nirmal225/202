import styled from 'styled-components'

export const IconContainer = styled.span`
  width: 80px;
  height: 80px;
  display: flex;
  color: #ff0000;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  box-sizing: border-box;
  background-color: ${props => (props.dark ? '#000000' : '#d7dfe9')};
`

export const TrendingHeading = styled.h1`
  margin-left: 15px;
  font-size: 30px;
  font-weight: 500;
  box-sizing: border-box;
  color: ${props => (!props.dark ? '#1e293b' : '#f9f9f9')};
`
