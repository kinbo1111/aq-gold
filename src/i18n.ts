import { initReactI18next } from 'react-i18next';
import i18n, { Resource } from 'i18next';
import translationEN from './locales/en/translation.json';
import translationJP from './locales/jap/translation.json';

interface Resources extends Resource {
  en: {
    translation: typeof translationEN;
  };
  jap: {
    translation: typeof translationJP;
  };
}

const resources: Resources = {
  en: {
    translation: translationEN,
  },
  jap: {
    translation: translationJP,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
