import styled from 'styled-components/native'

export const ButtonStyle = styled.Text`
    width: 100%;
    text-align: center;
    color: ${props => props.isPrimary ? "#fff" : "#eb4444"};
    background: ${props => props.isPrimary ? "#eb4444" : "transparent"};
    font-weight: 600;
    padding: 10px;
    margin-top: 10px
    border-radius: 3px;
    border: 2px solid #eb4444;
`