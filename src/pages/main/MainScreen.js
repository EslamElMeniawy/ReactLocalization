import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import { Button } from 'react-native-material-ui';
import PropTypes from 'prop-types';

import Styles from './Styles';
import { strings } from '../../i18n';

export default function MainScreen({ navigation }) {
  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <StatusBar barStyle="light-content" />
      <Text>{strings('main.main_screen')}</Text>
      <Button
        onPress={() => navigation.navigate('Settings')}
        raised
        text={strings('main.settings')}
      />
    </SafeAreaView>
  );
}

MainScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
