'use client';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Eye, EyeClosed, KeyRound } from 'lucide-react';
import { Tooltip } from '@/components/shared/tooltip';
import { Button } from '@/components/ui/button';
import React, { ReactNode, useState } from 'react';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Control, useController } from 'react-hook-form';

interface PasswordProps {
  control: Control;
  name: string;
  label: string;
  placeholder?: string;
  hideIcon?: boolean;
  children?: ReactNode;
}

export const Password = (props: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const { field, fieldState } = useController({
    name: props.name,
    control: props.control
  });

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel>{props.label}</FieldLabel>
      <InputGroup className="">
        <InputGroupAddon> <KeyRound/> </InputGroupAddon>
        <InputGroupInput
          {...field}
          placeholder={props.placeholder}
          type={showPassword ? 'text' : 'password'}
        />
        <InputGroupAddon align={'inline-end'}>
          <Tooltip content={showPassword ? 'Hide password' : 'Show password'}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={togglePassword}
              type={'button'}
            >
              {showPassword
                ? <Eye/>
                : <EyeClosed/>
              }
            </Button>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
      {props.children}
    </Field>
  );
};
