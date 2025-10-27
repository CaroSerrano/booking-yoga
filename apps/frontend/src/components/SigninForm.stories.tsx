import type { Meta, StoryObj } from '@storybook/react';
import { SigninForm } from './SigninForm';
import { fn } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof SigninForm> = {
  title: 'SigninForm',
  component: SigninForm,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    onSubmit: fn(),
    loading: false,
    error: '',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ValidationErrors: Story = {
  args: {
    error: 'Name is required',
  },
};

export const Submitting: Story = {
  args: {
    loading: true,
  },
};

export const Success: Story = {
  args: {
    successMessage: 'Successfully signed in',
  },
};

export const PasswordVisible: Story = {
  args: {
    showPassword: true,
  },
};
