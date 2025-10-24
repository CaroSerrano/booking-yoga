import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
export const Large: Story = {
  args: { className: 'w-10 h-10' },
};
export const Small: Story = {
  args: { className: 'w-3 h-3' },
};
