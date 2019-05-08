import React from 'react';
import {
  SafeAreaView, StatusBar, Text, View,
} from 'react-native';
import { Button } from 'react-native-material-ui';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

import Styles from './Styles';
import { setLocale, strings } from '../../i18n';

async function setLanguage(value, navigation) {
  try {
    await AsyncStorage.setItem('language', value);
    setLocale(value);
    navigation.reset([NavigationActions.navigate({ routeName: 'Main' })], 0);
  } catch (e) {
    // saving error
    console.log('Saving Error: ', e);
  }
}

export default function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <StatusBar barStyle="light-content" />
      <Text>{strings('settings.settings_screen')}</Text>
      <View style={Styles.languageView}>
        <Button
          onPress={() => setLanguage('ar', navigation)}
          raised
          text={strings('splash.arabic')}
          style={Styles.languageButton}
        />
        <Button
          onPress={() => setLanguage('en', navigation)}
          raised
          text={strings('splash.english')}
          style={Styles.languageButton}
        />
      </View>
    </SafeAreaView>
  );
}

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    reset: PropTypes.func.isRequired,
  }).isRequired,
};
