import vi from '../locates/vi.json'
import en from '../locates/en.json'
import * as Localization from 'expo-localization'
import {I18n} from 'i18n-js'

const translations = {
    en : en,
    vi: vi,
}

const i18n = new I18n(translations);

i18n.locale = 'vi'
i18n.enableFallback = true;

export const changeLanguage = (languageCode) => {
    I18n.translations = {
        [languageCode]: translations[languageCode]
    };
    I18n.locale = languageCode;
    i18n.translations = {
        [languageCode]: translations[languageCode]
    };
    i18n.locale = languageCode;
};

export const loadLocale = async () => {
  for (const locale of Localization.locales) {
    if (i18n.translations[locale.languageCode] !== null) {
      i18n.locale = locale.languageCode
      switch (locale.languageCode) {
        case 'vi':
          import('../locates/vi.json').then(vi => {
            i18n.translations = { vi }
          })
          break
        default:
        case 'en':
          import('../locates/en.json').then(en => {
            i18n.translations = { en }
          })
          break
      }
      break
    }
  }
}

export default i18n;