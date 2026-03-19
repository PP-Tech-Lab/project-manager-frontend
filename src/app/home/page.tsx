'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { meAction } from '@/app/home/actions/me.action';
import { useEffect, useState } from 'react';

const Home = () => {
  const [user, setUser] = useState(null);
  const t = useTranslations('auth');

  const getCurrentUser = async () => {
    const user = await meAction();
    console.log(user);
    setUser(user);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">User data</h1>
      {user ? (
        <pre className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-900 rounded">
          {JSON.stringify(user, null, 2)}
        </pre>
      ) : (
        <p className="mt-4 text-red-500">No se pudo cargar la información del usuario.</p>
      )}

      <Button>{t('links.logout')}</Button>
    </div>
  );
};

export default Home;
