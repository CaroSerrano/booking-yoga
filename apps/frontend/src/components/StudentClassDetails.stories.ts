import type { Meta, StoryObj } from '@storybook/react-vite';
import StudentClassDetails from './StudentClassDetails';
import { listBookings } from '../useCases/listBookings';
import { mocked } from 'storybook/internal/test';

const meta = {
  title: 'Student class details',
  component: StudentClassDetails,
  parameters: {
    layout: 'centered',
  },
  args: {
    user: {
      id: '1',
      email: '',
      phoneNumber: '',
      name: '',
      role: 'USER',
      status: 'ACTIVE',
    },
  },
} satisfies Meta<typeof StudentClassDetails>;

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

export const CancelledClass: Story = {
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
        status: 'CANCELLED',
        totalSlots: 10,
        availableSlots: 5,
        description: 'Multi-level group class',
        location: 'Brandenburg',
        bookingPrice: 10,
        address: 'Humboldtstr. 14b, Schwäbisch Gmünd, Brandenburg',
        teacher: { name: 'Florencia Colorado', email: 'flor@email.com' },
        bookings: [],
      },
    },
  },
};

export const WithError: Story = { args: { currentClass: null } };

export const NoAvailableSlots: Story = {
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
        availableSlots: 0,
        description: 'Multi-level group class',
        location: 'Brandenburg',
        bookingPrice: 10,
        address: 'Humboldtstr. 14b, Schwäbisch Gmünd, Brandenburg',
        teacher: { name: 'Florencia Colorado', email: 'flor@email.com' },
        bookings: [],
      },
    },
  },
};

export const AlreadyBooked: Story = {
  async beforeEach() {
    mocked(listBookings).mockResolvedValue([
      { classId: '1', userId: '1', status: 'CONFIRMED', id: 'b1' },
    ]);
  },
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
        bookings: [{ classId: '1', userId: '1' }],
      },
    },
  },
};
