import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { CreateClassForm } from './CreateClassForm';

const meta = {
  title: 'CreateClassForm',
  component: CreateClassForm,
  parameters: {
    layout: 'padded',
  },
  args: {
    onSubmit: fn(),
    loading: false,
    error: '',
    user: {
      id: '1',
      email: '',
      name: '',
      phoneNumber: '',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  },
} satisfies Meta<typeof CreateClassForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ValidationErrors: Story = {
  args: {
    error: 'Title is required',
  },
};

export const Submitting: Story = {
  args: {
    loading: true,
  },
};
