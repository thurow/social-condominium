import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  textInput: {
    height: 40,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: Colors.facebook,
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})
