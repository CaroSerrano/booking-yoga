import FullCalendar from '@fullcalendar/react';
import type { EventInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

export interface CalendarProps {
  events: EventInput[];
}

export default function Calendar({ events }: CalendarProps) {
  return (
    <div className='w-[90%] h-fit p-5 m-5 bg-black/90 rounded-2xl'>
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
          alert(`evento clickeado:  ${info.event.title}`);
        }}
        eventClassNames='cursor-pointer'
      />
    </div>
  );
}
