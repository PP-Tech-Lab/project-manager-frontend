'use client';

import { useState } from 'react';
import { Login } from '@/app/auth/components/login';
import { SingUp } from '@/app/auth/components/sing-up';
import { RecoverPassword } from '@/app/auth/components/recover-password';
import { AuthForm } from '@/app/auth/types';

const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState<AuthForm>('login');

  const handleSwitchForm = (form: AuthForm) => {
    setCurrentForm(form);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      {currentForm === 'login' && <Login onSwitchForm={handleSwitchForm}/>}
      {currentForm === 'sing-up' && <SingUp onSwitchForm={handleSwitchForm}/>}
      {currentForm === 'recover-password' && <RecoverPassword onSwitchForm={handleSwitchForm}/>}
    </div>
  );
};

export default AuthPage;
