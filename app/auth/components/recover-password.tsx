import { AuthForm } from '@/app/auth/types';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/form';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface RecoverPasswordProps {
  onSwitchForm: (form: AuthForm) => void;
}

export const RecoverPassword = ({ onSwitchForm }: RecoverPasswordProps) => {
  const tAuth = useTranslations('auth');
  const tForm = useTranslations('form');

  const formSchema = z.object({
    email: z
      .string()
      .email(tForm('errors.invalid-email'))
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  const handleSubmit = (data: any) => {
    console.log('Form Data: ', data);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{tAuth('recover-password.title')}</CardTitle>
        <CardDescription>{tAuth('recover-password.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          inputs={[{
            name: 'email',
            label: tForm('field.email'),
            placeholder: tForm('placeholder.email'),
            icon: <User/>
          }]}
          control={form.control}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex flex-col">
            <Button className="mt-4" type="submit">{tAuth('recover-password.recover')}</Button>
            <Button
              variant="link"
              onClick={() => onSwitchForm('sing-up')}
              className="justify-end"
            >
              <small>{tAuth('links.sing-up')}</small>
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
