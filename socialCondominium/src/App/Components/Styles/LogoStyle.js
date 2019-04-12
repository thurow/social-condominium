import { StyleSheet, PixelRatio } from 'react-native';
import { ApplicationStyles } from '../../Themes/ApplicationStyles';

export default StyleSheet.create({
	logo: {
		maxWidth: '100%',
		padding: PixelRatio.getPixelSizeForLayoutSize(2),
		height: PixelRatio.getPixelSizeForLayoutSize(50),
		width: PixelRatio.getPixelSizeForLayoutSize(75)
  },
  containerLogo: {
    height: PixelRatio.getPixelSizeForLayoutSize(50),
    alignItems: 'center'
  },
	container: {
		flex: 1
	}
});
