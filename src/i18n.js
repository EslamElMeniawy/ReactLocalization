import ReactNative from 'react-native';
import I18n from 'react-native-i18n';
import AsyncStorage from '@react-native-community/async-storage';

// Import all locales.
import en from '../locales/en.json';
import ar from '../locales/ar.json';

// If an English translation is not available in en.js, it will look inside ar.js
I18n.fallbacks = true;

// It will convert HOME_noteTitle to "HOME note title"
// if the value of HOME_noteTitle doesn't exist in any of the translation files.
I18n.missingBehaviour = 'guess';

// If the current locale in device is not en or ar.
I18n.defaultLocale = 'en';

async function getLanguage() {
  try {
    const value = await AsyncStorage.getItem('language');
    console.log('Language: ', value);

    if (value !== null) {
      I18n.locale = value;
    } else {
      I18n.locale = 'en';
    }
  } catch (e) {
    // Error reading value.
    console.log('Error Reading Value: ', e);
    I18n.locale = 'en';
  }
}

getLanguage();

// Define the supported translations.
I18n.translations = {
  en,
  ar,
};

export const setLocale = (locale) => {
  I18n.locale = locale;
};

// It will be used to define initial language state in reducer.
export const getCurrentLocale = () => I18n.locale;

// Is it a RTL language?
export const isRTL = getCurrentLocale().indexOf('ar') === 0;

// Allow RTL alignment in RTL languages.
ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string.
export function strings(name, params = {}) {
  return I18n.t(name, params);
}

export default I18n;
