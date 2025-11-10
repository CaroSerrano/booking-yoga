import type { Meta, StoryObj } from '@storybook/react';
import PaymentSuccess from './PaymentSuccess';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof PaymentSuccess> = {
  component: PaymentSuccess,
  title: 'PaymentSuccess',
  parameters: { layout: 'fullscreen' },
  args: {
    email: 'fulanito@email.com'
  },
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

export const Default: Story = {};

