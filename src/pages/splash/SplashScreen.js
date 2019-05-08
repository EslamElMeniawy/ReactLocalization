import React, { Component } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Button } from 'react-native-material-ui';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import Styles from './Styles';
import { setLocale, strings } from '../../i18n';

export default class SplashScreen extends Component {
  state = {
    languageSet: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.getLanguage();
    }, 2000);
  }

  getLanguage = async () => {
    const { navigation } = this.props;

    try {
      const value = await AsyncStorage.getItem('language');
      console.log('Language: ', value);

      if (value !== null) {
        navigation.navigate('App');
      } else {
        this.setState({ languageSet: false });
      }
    } catch (e) {
      // error reading value
      console.log('Error Reading Value: ', e);
    }
  };

  setLanguage = async (value) => {
    const { navigation } = this.props;

    try {
      await AsyncStorage.setItem('language', value);
      setLocale(value);
      navigation.navigate('App');
    } catch (e) {
      // saving error
      console.log('Saving Error: ', e);
    }
  };

  getLanguageBlock = () => {
    const { languageSet } = this.state;

    if (!languageSet) {
      return (
        <View style={Styles.languageView}>
          <Button
            onPress={() => this.setLanguage('ar')}
            raised
            text={strings('splash.arabic')}
            style={Styles.languageButton}
          />
          <Button
            onPress={() => this.setLanguage('en')}
            raised
            text={strings('splash.english')}
            style={Styles.languageButton}
          />
        </View>
      );
    }

    return null;
  };

  render() {
    return (
      <SafeAreaView style={Styles.safeAreaView}>
        <StatusBar barStyle="light-content" />
        {this.getLanguageBlock()}
      </SafeAreaView>
    );
  }
}

SplashScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
