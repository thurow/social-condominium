import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { ButtonStyle } from './styles'

const ActionButton = ({ title, color, action, isPrimary, disabled = false }) => {
  return (
    <TouchableOpacity onPress={action} disabled={disabled}>
      <ButtonStyle isPrimary={isPrimary} color={color} disabled={disabled}>{title}</ButtonStyle>
    </TouchableOpacity>
  )
}

ActionButton.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func,
  isPrimary: PropTypes.bool,
  color: PropTypes.string
}

ActionButton.defaultProps = {
  title: 'Clique Aqui',
  action: () => alert('Pressinou'),
  isPrimary: false,
  color: '#eb4444'
}

export default ActionButton
