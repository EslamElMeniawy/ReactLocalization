import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import SplashScreen from './pages/splash/SplashScreen';
import MainScreen from './pages/main/MainScreen';
import SettingsScreen from './pages/settings/SettingsScreen';

const AppStack = createStackNavigator(
  {
    Main: MainScreen,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    App: AppStack,
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return <AppContainer />;
}
