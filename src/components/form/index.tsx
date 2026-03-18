'use client';

import { Input } from '@/components/form/inputs/input';
import { HTMLInputTypeAttribute, ReactNode } from 'react';
import { Password } from '@/components/form/inputs/password';

interface InputProps extends Record<string, any> {
  name: string;
  label: string;
  placeholder?: string;
  icon?: ReactNode;
  type?: HTMLInputTypeAttribute;
}

interface FormProps {
  inputs: InputProps[];
  control?: any;
  children?: ReactNode;
  onSubmit?: (data: any) => void;
}

export const Form = ({ inputs, control, children, onSubmit }: FormProps) => {
  const getInput = (input: InputProps) => {
    switch (input.type) {
      case 'password':
        return <Password key={input.name} {...input} control={control}/>;
      default:
        return <Input key={input.name} {...input} control={control}/>;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        {inputs.map(getInput)}
      </div>
      {children}
    </form>
  );
};
