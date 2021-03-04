import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const startI18n = (files, lang) => i18n.use(LanguageDetector).init({
  lng: lang,
  fallbackLng: 'en',
  resources: files,
  ns: ['common'],
  defaultNS: 'common',
  keySeparator: false, // we use content as keys,
  debug: false
})

export default startI18n