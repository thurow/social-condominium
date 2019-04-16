import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { ButtonStyle } from './styles'

const ActionButton = ({ title, action, isPrimary }) => {
  return (
    <TouchableOpacity onPress={action}>
      <ButtonStyle isPrimary={isPrimary}>{title}</ButtonStyle>
    </TouchableOpacity>
  )
}

ActionButton.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func,
  isPrimary: PropTypes.bool
}

ActionButton.defaultProps = {
  title: 'Clique Aqui',
  action: () => alert('Pressinou'),
  isPrimary: false
}

export default ActionButton
