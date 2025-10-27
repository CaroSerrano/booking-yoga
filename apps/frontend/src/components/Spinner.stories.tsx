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
  args: { size: 40 },
};
export const Small: Story = {
  args: { size: 15 },
};
