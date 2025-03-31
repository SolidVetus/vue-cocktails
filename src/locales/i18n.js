import { createI18n } from 'vue-i18n'
import en from './en.json'
import ru from './ru.json'
import de from './de.json'
import es from './es.json'
import fr from './fr.json'
import it from './it.json'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ru,
    de,
    es,
    fr,
    it,
  },
})

export default i18n
