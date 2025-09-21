import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'bn'],
    fallbackLng: 'en',
    debug: true,
    backend: {
      // THE FIX IS HERE: Prepend Vite's base URL to the load path.
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/translation.json`,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
