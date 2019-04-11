import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import { PixelRatio } from 'react-native'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      paddingVertical:PixelRatio.getPixelSizeForLayoutSize(10),
      paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5),
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent
    },
    section: {
      flex: 1,
      justifyContent: 'center',
      padding: 10
    },
    containerLogo: {
      height: PixelRatio.getPixelSizeForLayoutSize(50),
      alignItems: 'center'
    },
    logo: {
      maxWidth: '100%',
      padding:PixelRatio.getPixelSizeForLayoutSize(2),
      height:PixelRatio.getPixelSizeForLayoutSize(50),
      width: PixelRatio.getPixelSizeForLayoutSize(75),
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h1,
      marginBottom: 20,
      fontSize: 22,
      textAlign: 'center',
      color: Colors.facebook
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.facebook,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  }
}

export default ApplicationStyles
