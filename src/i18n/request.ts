import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  let locale = 'en';

  return {
    locale,
    messages: {
      auth: (await import(`@/i18n/messages/${locale}/auth.json`)).default,
      form: (await import(`@/i18n/messages/${locale}/form.json`)).default
    }
  };
});
