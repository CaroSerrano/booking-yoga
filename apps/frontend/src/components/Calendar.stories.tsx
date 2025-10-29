import type { Meta, StoryObj } from '@storybook/react-vite';
import Calendar from './Calendar';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Calendar',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAnEvent: Story = {
  args: {
    events: [
      {
        title: 'Hatha yoga',
        start: '2025-10-28T12:30:00Z',
        end: '2025-10-28T13:30:00Z',
        color: '#1e4f5e',
      },
    ],
  },
};

export const WithMultipleEvent: Story = {
  args: {
    events: [
      {
        title: 'Hatha yoga',
        start: '2025-10-28T12:30:00Z',
        end: '2025-10-28T13:30:00Z',
        color: '#1e4f5e',
      },
      {
        title: 'Hatha yoga',
        start: '2025-10-28T15:30:00Z',
        end: '2025-10-28T16:30:00Z',
        color: '#1e4f5e',
      },
      {
        title: 'Hatha yoga',
        start: '2025-10-30T12:30:00Z',
        end: '2025-10-30T13:30:00Z',
        color: '#1e4f5e',
      },
      {
        title: 'Hatha yoga',
        start: '2025-10-31T12:30:00Z',
        end: '2025-10-31T13:30:00Z',
        color: '#1e4f5e',
      },
    ],
  },
};
