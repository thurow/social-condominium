import React from 'react'
import { InputText } from './styles'

const InpuTypeText = ({ stateValue, name, placeholder, autoCapitalize, keyboardType, onChange, secureTextEntry, onSubmitEditing }) => {
  return (
    <InputText
        value={stateValue}
        name={name}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
    />
  )
}

InpuTypeText.defaultProps = {
  secureTextEntry: false,
  onSubmitEditing: () => {}
}

export default InpuTypeText
