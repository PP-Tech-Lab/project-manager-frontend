import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  let locale = 'en';

  console.log('Locale: ', locale);
  return {
    locale,
    messages: {
      auth: (await import(`@/messages/${locale}/auth.json`)).default,
      form: (await import(`@/messages/${locale}/form.json`)).default
    }
  };
});
