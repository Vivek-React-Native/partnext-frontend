import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './assets/Translations/en.json';
import { NativeModules, Platform } from 'react-native';

// iOS:
const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    he: {
      translation: en,
    },
  },
  lng: locale.includes('en') ? 'he' : 'en', // Get the first device language
  fallbackLng: 'en',
  compatibilityJSON: 'v3', // By default React Native projects does not support Intl
});

export default i18next;
