import { vi, describe, it, expect } from 'vitest';
import { fetchClasses } from '../useCases/fetchClasses';
import { ClassRepository } from '../repositories/classRepository';
import type { EventInput } from '@fullcalendar/core/index.js';

vi.mock('../repositories/classRepository');

describe('fetchClasses', () => {
  it('retorna la lista de clases', async () => {
    const fakeClasses = [
      {
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
    ];
    vi.mocked(ClassRepository.fetchAll).mockResolvedValue(
      fakeClasses as EventInput[]
    );

    const result = await fetchClasses();

    expect(result).toEqual(fakeClasses);
    expect(ClassRepository.fetchAll).toHaveBeenCalled();
  });
});
