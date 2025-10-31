import type { Meta, StoryObj } from '@storybook/react-vite';
import { AdminClassDetails } from './AdminClassDetails';
import { fn } from 'storybook/test';

const meta = {
  title: 'Admin class details',
  component: AdminClassDetails,
  parameters: {
    layout: 'centered',
  },
  args: {
    fetchClasses: fn(),
    teachers: [
      {
        id: '1',
        name: 'Fulano',
        email: 'fulano@email.com',
        phoneNumber: '456',
        role: 'ADMIN',
        status: 'ACTIVE',
      },
      {
        id: '2',
        name: 'Mengano',
        email: 'fulano@email.com',
        phoneNumber: '456',
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    ],
  },
} satisfies Meta<typeof AdminClassDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentClass: {
      publicId: '1',
      title: 'Hatha yoga',
      start: new Date(),
      end: new Date(),
      allDay: false,
      groupId: '',
      hasEnd: true,
      defId: '191',
      recurringDef: null,
      url: '',
      sourceId: '1',
      ui: {
        display: null,
        constraints: [],
        overlap: null,
        allows: [],
        backgroundColor: '',
        borderColor: '',
        textColor: '',
        classNames: [],
        startEditable: null,
        durationEditable: null,
      },
      extendedProps: {
        teacherId: '161a48fc-1f9a-4481-a03e-59325087e106',
        status: 'SCHEDULE',
        totalSlots: 10,
        availableSlots: 5,
        description: 'Multi-level group class',
        location: 'Brandenburg',
        bookingPrice: 10,
        address: 'Humboldtstr. 14b, Schwäbisch Gmünd, Brandenburg',
        bookings: [],
        teacher: { name: 'Florencia Colorado', email: 'flor@email.com' },
      },
    },
  },
};

export const WithParticipants: Story = {
  args: {
    currentClass: {
      publicId: '1',
      title: 'Hatha yoga',
      start: new Date(),
      end: new Date(),
      allDay: false,
      groupId: '',
      hasEnd: true,
      defId: '191',
      recurringDef: null,
      url: '',
      sourceId: '1',
      ui: {
        display: null,
        constraints: [],
        overlap: null,
        allows: [],
        backgroundColor: '',
        borderColor: '',
        textColor: '',
        classNames: [],
        startEditable: null,
        durationEditable: null,
      },
      extendedProps: {
        teacherId: '161a48fc-1f9a-4481-a03e-59325087e106',
        status: 'SCHEDULE',
        totalSlots: 10,
        availableSlots: 5,
        description: 'Multi-level group class',
        location: 'Brandenburg',
        bookingPrice: 10,
        address: 'Humboldtstr. 14b, Schwäbisch Gmünd, Brandenburg',
        teacher: { name: 'Florencia Colorado', email: 'flor@email.com' },
        bookings: [
          {
            id: '1',
            userId: '1',
            classId: '1',
            expiresAt: new Date(),
            status: 'CONFIRMED',
            user: {
              id: '1',
              name: 'Juan Perez',
              email: 'user@email.com',
              phoneNumber: '123456',
            },
          },
          {
            id: '1',
            userId: '1',
            classId: '1',
            expiresAt: new Date(),
            status: 'CONFIRMED',
            user: {
              id: '1',
              name: 'Melina Perez',
              email: 'user@email.com',
              phoneNumber: '123456',
            },
          },
          {
            id: '1',
            userId: '1',
            classId: '1',
            expiresAt: new Date(),
            status: 'CONFIRMED',
            user: {
              id: '1',
              name: 'Gabriela Fernández',
              email: 'user@email.com',
              phoneNumber: '123456',
            },
          },
          {
            id: '1',
            userId: '1',
            classId: '1',
            expiresAt: new Date(),
            status: 'CONFIRMED',
            user: {
              id: '1',
              name: 'Camila López',
              email: 'user@email.com',
              phoneNumber: '123456',
            },
          },
        ],
      },
    },
  },
};

export const WithError: Story = { args: { currentClass: null } };
