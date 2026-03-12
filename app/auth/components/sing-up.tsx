'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/form';
import { Button } from '@/components/ui/button';
import { AuthForm } from '@/app/auth/types';
import { useTranslations } from 'next-intl';

interface SingUpProps {
  onSwitchForm: (form: AuthForm) => void;
}

export const SingUp = ({ onSwitchForm }: SingUpProps) => {
  const tAuth = useTranslations('auth');
  const tForm = useTranslations('form');

  const formSchema = z
    .object({
      email: z
        .string()
        .min(1, tForm('errors.required-field'))
        .email(tForm('errors.invalid-email')),
      password: z
        .string()
        .min(8, tForm('errors.password.invalid-length'))
        .regex(/[A-Z]/, tForm('errors.password.invalid-upper-case'))
        .regex(/[0-9]/, tForm('errors.password.invalid-number'))
        .regex(/^[a-zA-Z0-9]/, tForm('errors.password.invalid-symbol')),
      confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tForm('errors.password.invalid-match'),
      path: ['confirmPassword']
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    criteriaMode: 'all',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
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
      type: 'password',
      label: tForm('field.password'),
      placeholder: tForm('placeholder.password')
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: tForm('field.repeatPassword'),
      placeholder: tForm('placeholder.password')
    }
  ], []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{tAuth('sing-up.title')}</CardTitle>
        <CardDescription>{tAuth('sing-up.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form inputs={inputs} control={form.control} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <Button
              variant={'link'}
              className="justify-end"
              onClick={() => onSwitchForm('login')}
            >
              <small>{tAuth('links.login')}</small>
            </Button>
            <Button className="mt-4" type="submit">{tAuth('sing-up.send')}</Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
