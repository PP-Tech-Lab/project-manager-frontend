'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/form/form';
import { User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';

const AuthPage = () => {
  const formSchema = z.object({
    email: z.string().min(1, 'El email es requerido').email('Correo invalido'),
    password: z.string().min(1, 'La contraseña es requerida')
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const inputs = useMemo(() => [
    {
      name: 'email',
      label: 'Email',
      placeholder: 'email@example.com',
      icon: <User/>
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      placeholder: '********',
      children: <>
        <Button variant="link" type="button" className="justify-end underline">
          <small>¿Olvidaste tu contraseña?</small>
        </Button>
      </>
    }
  ], []);

  const onSubmit = (data: any) => {
    console.log('Form Data: ', data);
  };
//Ver referencia de https://ui.shadcn.com/docs/forms/react-hook-form
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Inicia sesión</CardTitle>
          <CardDescription>Ingresa para acceder a todo el contenido</CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            inputs={inputs}
            control={form.control}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">

              <Button className={'mt-3'}>Ingresar</Button>
              <Button variant="link" type="button" className="justify-center mb-3 underline mt-5">
                ¿No tienes cuenta? Registrate
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
