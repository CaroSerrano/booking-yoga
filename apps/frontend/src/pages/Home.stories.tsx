import type { Meta, StoryObj } from '@storybook/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Home> = {
  component: Home,
  title: 'Home',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const StudentView: Story = {
  args: {
    user: {
      email: '',
      id: '',
      name: '',
      phoneNumber: '',
      role: 'USER',
      status: 'ACTIVE',
    },
  },
};

export const AdminView: Story = {
  args: {
    user: {
      email: '',
      id: '',
      name: '',
      phoneNumber: '',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  },
};

export const NoUser: Story = {
  args: {
    user: undefined,
  },
};
