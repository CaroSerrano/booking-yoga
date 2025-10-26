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
    error: '',
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

export const ValidationErrors: Story = {
  args: {
    error: 'Ivalid credentials',
  },
};

export const Submitting: Story = {
  args: {
    loading: true,
  },
};

export const Success: Story = {
  args: {
    successMessage: 'Successfully logged in',
  },
};

export const PasswordVisible: Story = {
  args: {
    showPassword: true,
  },
};
