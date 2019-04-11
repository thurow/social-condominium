import { StyleSheet, PixelRatio } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  textInput: {
    height: 40,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: Colors.facebook,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    alignItems: 'center',
    textAlign: "center",
    color: Colors.snow,
    backgroundColor: Colors.mainColor,
    fontWeight: '600',
    padding: 10,
    marginTop: PixelRatio.getPixelSizeForLayoutSize(5)
  }
})
