jest.mock('react-native-gesture-handler', () => {
    const View = require('react-native/Libraries/Components/View/View');
    return {
      Swipeable: View,
      DrawerLayout: View,
      State: {},
      ScrollView: View,
      Slider: View,
      Switch: View,
      TextInput: View,
      ToolbarAndroid: View,
      ViewPagerAndroid: View,
      DrawerLayoutAndroid: View,
      WebView: View,
      NativeViewGestureHandler: View,
      TapGestureHandler: View,
      FlingGestureHandler: View,
      ForceTouchGestureHandler: View,
      LongPressGestureHandler: View,
      PanGestureHandler: View,
      PinchGestureHandler: View,
      RotationGestureHandler: View,
      /* Buttons */
      RawButton: View,
      BaseButton: View,
      RectButton: View,
      BorderlessButton: View,
      /* Other */
      FlatList: View,
      gestureHandlerRootHOC: jest.fn(),
      Directions: {},
    };
  });
  
  jest.mock('NativeModules', () => ({
    UIManager: {
      RCTView: () => {},
    },
    RNGestureHandlerModule: {
      attachGestureHandler: jest.fn(),
      createGestureHandler: jest.fn(),
      dropGestureHandler: jest.fn(),
      updateGestureHandler: jest.fn(),
      State: {},
      Directions: {}
    },
    PlatformConstants: {
      forceTouchAvailable: false,
    },
    KeyboardObserver: { 
  
    } 
  }))