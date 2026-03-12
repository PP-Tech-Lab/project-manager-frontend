'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/form';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import { User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthForm } from '@/app/auth/types';
import { useTranslations } from 'next-intl';

interface LoginProps {
  onSwitchForm: (form: AuthForm) => void;
}

export const Login = ({ onSwitchForm }: LoginProps) => {
  const tAuth = useTranslations('auth');
  const tForm = useTranslations('form');

  const formSchema = z.object({
    email: z
      .string()
      .min(1, tForm('errors.required-field'))
      .email(tForm('errors.invalid-email')),
    password: z
      .string()
      .min(1, tForm('errors.required-field'))
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log('Form Data: ', data);
  };

  const inputs = useMemo(() => [
    {
      name: 'email',
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
            <Button className="mt-3" type={'submit'}>Ingresar</Button>
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
    </Card>
  );
};
