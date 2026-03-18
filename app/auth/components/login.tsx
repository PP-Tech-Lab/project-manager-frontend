'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/form';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import { LoaderCircle, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthForm } from '@/app/auth/types';
import { useTranslations } from 'next-intl';
import { login } from '@/app/auth/actions/login';
import { useRouter } from 'next/navigation';
import { AlertDialog } from '@/components/shared/alert-dialog';

interface LoginProps {
  onSwitchForm: (form: AuthForm) => void;
}

export const Login = ({ onSwitchForm }: LoginProps) => {
  const router = useRouter();
  const tAuth = useTranslations('auth');
  const tForm = useTranslations('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const formSchema = z.object({
    username: z
      .string()
      .min(1, tForm('errors.required-field')),
    //.email(tForm('errors.invalid-email')), Todo - enabled when backend is ready
    password: z
      .string()
      .min(1, tForm('errors.required-field'))
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const onSubmit = async (formData: any) => {
    try {
      setLoading(true);

      const result = await login(formData);

      if (result.success) router.push('/home');
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputs = useMemo(() => [
    {
      name: 'username',
      label: tForm('field.email'),
      placeholder: tForm('placeholder.email'),
      icon: <User/>
    },
    {
      name: 'password',
      label: tForm('field.password'),
      type: 'password',
      placeholder: tForm('placeholder.password')
    }
  ], [tForm]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{tAuth('login.title')}</CardTitle>
        <CardDescription>{tAuth('login.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          inputs={inputs}
          control={form.control}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <Button
              variant="link"
              type="button"
              className="justify-end underline"
              onClick={() => onSwitchForm('recover-password')}
            >
              <small>{tAuth('links.recover-password')}</small>
            </Button>
            <Button
              className="mt-3"
              type={'submit'}
              disabled={loading}
            >
              {loading
                ? <LoaderCircle className={'animate-spin'}/>
                : tAuth('login.send')
              }
            </Button>
            <Button
              variant="link"
              className="justify-center mb-3 underline mt-5"
              onClick={() => onSwitchForm('sing-up')}
            >
              {tAuth('links.sing-up')}
            </Button>
          </div>
        </Form>
      </CardContent>

      <AlertDialog show={error} onClose={() => setError(false)}/>
    </Card>
  );
};
