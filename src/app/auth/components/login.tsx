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
import { loginAction } from '@/app/auth/actions/login.action';
import { useRouter } from 'next/navigation';
import { useAlertDialog } from '@/lib/hooks/useAlertDialog';
import { ApiErrors } from '@/lib/api/enums/api-errors.enum';

interface LoginProps {
  onSwitchForm: (form: AuthForm) => void;
}

export const Login = ({ onSwitchForm }: LoginProps) => {
  const t = useTranslations('auth');
  const alertDialog = useAlertDialog();
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

  //t('failed-login.title')
//t('failed-login.description')
//t('failed-login.confirm')

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setLoading(true);
    const result = await loginAction(formData);

    if (result.success) return router.push('/home');

    const title = result.error == ApiErrors.UNAUTHORIZED
      ? t('failed-login.title')
      : t('failed-request.title');

    const description = ApiErrors.UNAUTHORIZED
      ? t('failed-request.description')
      : t('failed-request.description');

    alertDialog.openDialog({ title, description, type: 'error' });
    setLoading(false);
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

      {/*<AlertDialog show={error} onClose={() => setError(false)}/>*/}
    </Card>
  );
};
