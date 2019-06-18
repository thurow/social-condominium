import styled from 'styled-components/native'

export const InputText = styled.TextInput`
    height: ${props => props.multiline ? "90px" : '40px'};
    margin-bottom: 10px;
    ${props => props.multiline ? "margin-top: 10px" : ""};
    ${props => props.multiline ? "align-items: flex-start" : ""};
    padding-bottom: 10px;
    ${props => props.multiline ? "padding:10px" : ""};
    ${props => props.multiline ? "border-width: 1" : "border-bottom-width: 1"};
    ${props => props.multiline ? "border-color: #3b5998;" : "border-bottom-color: #3b5998;"};
`