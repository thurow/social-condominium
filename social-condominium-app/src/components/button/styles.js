import styled from 'styled-components/native'

const color = props => props.color

export const ButtonStyle = styled.Text`
    width: 100%;
    text-align: center;
    color: ${props => props.isPrimary ? "#fff" : color};
    background: ${props => props.isPrimary ? color : "transparent"};
    font-weight: 600;
    padding: 10px;
    margin-top: 10px
    border-radius: 3px;
    border: 2px solid ${color};
`