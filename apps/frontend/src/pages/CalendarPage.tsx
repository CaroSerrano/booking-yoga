import type { CreateClassDTO, LoginResponseDTO } from 'booking-backend';
import { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { CreateClassForm } from '../components/CreateClassForm';
import type { EventInput } from '@fullcalendar/core/index.js';
import Calendar from '../components/Calendar';
import { IoMdAdd } from "react-icons/io";

export interface CalendarPageProps {
  user?: LoginResponseDTO;
  onSubmit: (data: CreateClassDTO) => void;
  loading?: boolean;
  classes: EventInput[];
  fetchClasses: () => Promise<void>;
}

export default function CalendarPage({
  user,
  onSubmit,
  loading,
  classes,
  fetchClasses,
}: CalendarPageProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('Book a class!');
  const [openModal, setOpenModal] = useState(false);
  console.log('classes: ', classes);
  useEffect(() => {
    if (user && user.role === 'ADMIN') {
      setIsAdmin(true);
      setWelcomeMessage('You can now start managing classes');
    }
  }, [user]);

  if (!user) return null;
  return (
    <article className='flex flex-col items-center'>
      <h1 className='text-2xl mb-5'>{welcomeMessage}</h1>
      {isAdmin && (
        <Button
          className='border border-white'
          onClick={() => setOpenModal(!openModal)}
        >
          <IoMdAdd size={24} />
          Schedule a class
        </Button>
      )}
      <Calendar
        events={classes}
        isAdmin={isAdmin}
        fetchClasses={fetchClasses}
      />
      {openModal && (
        <Modal
          title='CREATE A NEW CLASS'
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        >
          <CreateClassForm
            onSubmit={onSubmit}
            user={user}
            loading={loading}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}
    </article>
  );
}
