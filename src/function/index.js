import {I18nManager} from 'react-native';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import _ from 'lodash';
import {StoreData} from 'utils'; 
require('dayjs/locale/th');

// -------- Translate ------------

export const TranslationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  EN: () => require('../translations/en.json'),
  TH: () => require('../translations/th.json'),
};

export const Translate = memoize(
  (key, config) => {
    return i18n.t(key, config);
  },
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const ChangeLanguage = (lang = 'TH') => {
  Translate.cache.clear();
  I18nManager.forceRTL(false);
  i18n.translations = {[lang]: TranslationGetters[lang]()};
  i18n.locale = lang;
  StoreData({key: 'language', value: lang});
};
