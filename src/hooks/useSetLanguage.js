import {ChangeLanguage} from 'function';

export default function useSetLanguage(setlang) {
  const lang = ['TH', 'EN'];

  ChangeLanguage(lang[lang.findIndex(ele => ele === setlang)]);

  return null;
}
