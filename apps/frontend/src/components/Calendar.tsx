import FullCalendar from '@fullcalendar/react';
import type { EventInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { useEffect, useState } from 'react';
import { Modal } from './Modal';
import type { UserResponseDTO } from 'booking-backend';
import { AdminClassDetails } from './AdminClassDetails';
import type { ClassDetails } from './AdminClassDetails';

export interface CalendarProps {
  events: EventInput[];
  isAdmin?: boolean;
  fetchClasses: () => Promise<void>;
}

export default function Calendar({ events, isAdmin = false, fetchClasses }: CalendarProps) {
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<ClassDetails | null>(null);
  const [teachers, setTeachers] = useState<UserResponseDTO[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/user/teachers', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setTeachers(data);
        }
      } catch {
        setTeachers([]);
      }
    };
    fetchTeachers();
  }, []);

  const onAdminEventClick = () => {
    setOpenAdminModal(true);
  };
  const onUserEventClick = () => {
    setOpenUserModal(true);
  };
  return (
    <div className='w-[90%] h-fit p-5 m-5 bg-zinc-950/90 rounded-2xl'>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin]}
        initialView='dayGridMonth'
        height='auto'
        hiddenDays={[0]}
        events={events}
        eventDisplay='block'
        eventColor='#1e4f5e'
        displayEventEnd={true}
        windowResize={(arg) => {
          if (window.innerWidth < 768 && arg.view.type !== 'listWeek') {
            arg.view.calendar.changeView('listWeek');
          } else if (window.innerWidth >= 768 && arg.view.type === 'listWeek') {
            arg.view.calendar.changeView('dayGridMonth');
          }
        }}
        eventClick={(info) => {
          const eventObject = {
            start: info.event._instance?.range.start,
            end: info.event._instance?.range.end,
            ...info.event._def,
          };
          setCurrentEvent(eventObject);
          if (isAdmin) {
            onAdminEventClick();
          } else {
            onUserEventClick();
          }
        }}
        eventClassNames='cursor-pointer'
      />
      {openAdminModal && (
        <Modal
          isOpen={openAdminModal}
          onClose={() => setOpenAdminModal(false)}
          title='Class details'
        >
          <AdminClassDetails currentClass={currentEvent} teachers={teachers} fetchClasses={fetchClasses} />
        </Modal>
      )}
      {openUserModal && (
        <Modal
          isOpen={openUserModal}
          onClose={() => setOpenUserModal(false)}
          title='Class details'
        >
          User modal content
        </Modal>
      )}
    </div>
  );
}
