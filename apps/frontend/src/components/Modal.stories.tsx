import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from './Button';

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Sample Modal',
  },
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    children: <p>This is a basic modal with some text content.</p>,
  },
};

export const WithInteractiveContent: Story = {
  args: {
    title: 'Form inside modal',
    children: (
      <form className='flex flex-col gap-2'>
        <label>
          Name:
          <input type='text' className='border rounded p-1 w-full' />
        </label>
        <label>
          Email:
          <input type='email' className='border rounded p-1 w-full' />
        </label>
        <Button type='submit' className='bg-gray-700 text-white rounded p-2'>
          Submit
        </Button>
      </form>
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    title: undefined,
    children: <p>Modal without a title.</p>,
  },
};

export const WithLongContent: Story = {
  args: {
    title: 'Scrollable content',
    children: (
      <div className='space-y-2'>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i}>This is line {i + 1} of long modal content.</p>
        ))}
      </div>
    ),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    children: <p>This should not be visible because the modal is closed.</p>,
  },
};
