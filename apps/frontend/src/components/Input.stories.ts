import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { fn } from 'storybook/test';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: {
    flexCol: true,
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: { label: 'Name', placeholder: 'Jane Doe', id: 'fname' },
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Contraseña',
    name: 'password',
    id: 'fpass',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    id: 'femail',
    label: 'Email',
    name: 'email',
    placeholder: 'email@example.com',
  },
};

export const Checkbox: Story = {
  args: {
    type: 'checkbox',
    id: 'fterms',
    label: 'Acepto las políticas de privacidad',
    flexCol: false,
    value: 'true',
    name: 'acceptPrivacy',
  },
};
