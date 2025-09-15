// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Use English if a translation is missing
    lng: 'en', // Set the initial language
    debug: true, // Keep this on for troubleshooting
    interpolation: {
      escapeValue: false,
    },
    backend: {
      // This path is relative to the 'public' folder.
      loadPath: './public/locales/{{lng}}/translation.json',
    }
  });

export default i18n;