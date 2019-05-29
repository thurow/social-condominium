import React from 'react'
import { InputText } from './styles'

const InpuTypeText = ({ stateValue, name, placeholder, autoCapitalize, keyboardType, onChange, secureTextEntry, onSubmitEditing, multiline, numberOfLines }) => {
  return (
    <InputText
        value={stateValue}
        name={name}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        onChangeText={onChange}
        numberOfLines={numberOfLines}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
    />
  )
}

InpuTypeText.defaultProps = {
  secureTextEntry: false,
  onSubmitEditing: () => {},
  multiline: false
}

export default InpuTypeText
