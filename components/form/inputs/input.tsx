'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import React, { ReactNode } from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Control, useController } from 'react-hook-form';

interface FormInputProps {
  control: Control;
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export const Input = (props: FormInputProps) => {
  const { field, fieldState } = useController({
    name: props.name,
    control: props.control
  });

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel>{props.label}</FieldLabel>
      <InputGroup className="">
        {props.icon && <InputGroupAddon>{props.icon}</InputGroupAddon>}
        <InputGroupInput
          {...field}
          placeholder={props.placeholder}
          type={props.type}
        />
      </InputGroup>
      {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
      {props.children}
    </Field>
  );
};
