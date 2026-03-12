import esAuth from '@/messages/es/auth.json';
import esForm from '@/messages/es/form.json';
//import esCommon from '@/messages/es/common.json'

type Messages = {
  auth: typeof esAuth,
  form: typeof esForm,
  // common: typeof enCommon
}

declare module 'next-intl' {
  interface AppConfig {
   // Locale: 'es' | 'en',
    Messages: Messages
  }
}
