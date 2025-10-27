import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { fn } from 'storybook/test';
import { Spinner } from './Spinner';

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
    type: 'button'
  },
  argTypes: {
    variant: {
      options: ['primary', 'danger', 'disabled', 'loading'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: 'Botón',
    variant: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Deshabilitado',
    variant: 'disabled',
  },
};

export const Danger: Story = {
  args: {
    children: 'Eliminar',
    variant: 'danger',
  },
};

export const Loading: Story = {
  args: {
    variant: 'loading',
    children: (
      <>
        <Spinner />
        Cargando...
      </>
    ),
  },
};
