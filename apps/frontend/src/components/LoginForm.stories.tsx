import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { fn } from 'storybook/test';

const meta: Meta<typeof LoginForm> = {
  title: 'LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'padded',
  },
  args: {
    onSubmit: fn(),
    loading: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    defaultValues: { email: 'user@example.com', password: 'secret123' },
  },
};

export const Submitting: Story = {
  args: {
    loading: true,
  },
};

export const PasswordVisible: Story = {
  args: {
    showPassword: true,
  },
};
