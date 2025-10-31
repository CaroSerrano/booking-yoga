import type { EventDef } from '@fullcalendar/core/internal';
import type { ExtendedBooking, UserResponseDTO } from 'booking-backend';
import { Button } from './Button';
import { useState } from 'react';
import { BookingStatus, ClassStatus } from 'booking-domain';
import toast from 'react-hot-toast';
import confirmToast from './confirmToast';

export interface ClassDetails extends EventDef {
  start: Date | undefined;
  end: Date | undefined;
}
export interface ClassDetailsProps {
  currentClass: ClassDetails | null;
  teachers: UserResponseDTO[];
  fetchClasses: () => Promise<void>;
}

export function AdminClassDetails({
  currentClass,
  teachers,
  fetchClasses,
}: ClassDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() => {
    if (!currentClass) return null;
    return {
      title: currentClass.title,
      description: currentClass.extendedProps.description || '',
      status: currentClass.extendedProps.status,
      teacherId: currentClass.extendedProps.teacherId || '',
      start: currentClass.start?.toISOString().slice(0, 16),
      end: currentClass.end?.toISOString().slice(0, 16),
      address: currentClass.extendedProps.address || '',
      bookingPrice: currentClass.extendedProps.bookingPrice || '',
    };
  });

  if (!currentClass || !formData)
    return (
      <div className='w-fit m-4 rounded-2xl py-3'>
        Error getting class details. Please try again
      </div>
    );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev!, [name]: value }));
  };

  const handleRemoveParticipant = async (bookingId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/booking/${bookingId}`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: JSON.stringify({ status: BookingStatus.CANCELLED }),
        }
      );
      if (!res.ok) {
        throw new Error('Error updating booking status');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev!, [name]: value }));
  };

  const handleCancelClass = async () => {
    const ok = await confirmToast(
      'Are you sure you want to cancel this class?'
    );
    if (ok) {
      const updatedFormData = { ...formData, status: ClassStatus.CANCELLED };
      setFormData(updatedFormData);
      await handleSave(updatedFormData);
    }
  };

  const handleSave = async (dataToSave = formData) => {
    setIsEditing(false);
    try {
      const fd = new FormData();
      for (const [key, value] of Object.entries(dataToSave)) {
        if (value !== undefined && value !== null)
          fd.append(key, String(value));
      }
      const res = await fetch(
        `http://localhost:3000/api/class/${currentClass.publicId}`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: fd,
        }
      );
      if (!res.ok) {
        throw new Error('Error updating class');
      }
      const data = await res.json();
      console.log(data);
      await fetchClasses();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  let classStatusColor = '';
  switch (currentClass.extendedProps.status) {
    case ClassStatus.SCHEDULE:
      classStatusColor = 'bg-green-500/70';
      break;
    case ClassStatus.CANCELLED:
      classStatusColor = 'bg-red-500/80';
      break;
    default:
      classStatusColor = 'bg-gray-500/80';
      break;
  }

  return (
    <div className='flex flex-col gap-2 bg-zinc-900 py-3 px-5 rounded-2xl m-4 max-w-xl'>
      <div className='flex justify-between items-center'>
        <h3 className='text-center border-b pb-2 font-bold text-xl'>
          {isEditing ? (
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              className='bg-transparent w-full border rounded-md p-1 text-center'
            />
          ) : (
            currentClass.title
          )}
        </h3>
        <span
          className={`py-1 px-2 rounded-md ml-2 text-center text-sm ${classStatusColor}`}
        >
          {currentClass.extendedProps.status}
        </span>
      </div>
      {isEditing ? (
        <textarea
          name='description'
          value={formData.description}
          placeholder='class description'
          onChange={handleChange}
          className='bg-transparent border rounded-md p-1'
        />
      ) : (
        <p>{currentClass.extendedProps.description}</p>
      )}
      <label>
        <b>Taught by:</b>{' '}
        {isEditing ? (
          <select
            className='bg-transparent border rounded-md p-1'
            name='teacherId'
            onChange={handleTeacherChange}
          >
            <option
              className='text-black'
              selected
              value={currentClass.extendedProps.teacherId}
            >
              {currentClass.extendedProps.teacher.name}
            </option>
            {teachers.map((t) => (
              <option className='text-black' key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        ) : (
          currentClass.extendedProps.teacher.name
        )}
      </label>
      <label>
        <b>From:</b>{' '}
        {isEditing ? (
          <input
            type='datetime-local'
            name='start'
            value={formData.start}
            onChange={handleChange}
            className='border rounded-md p-1'
          />
        ) : (
          currentClass.start?.toLocaleString()
        )}
      </label>
      <label>
        <b>To:</b>{' '}
        {isEditing ? (
          <input
            type='datetime-local'
            name='end'
            value={formData.end}
            onChange={handleChange}
            className='border rounded-md p-1'
          />
        ) : (
          currentClass.end?.toLocaleString()
        )}
      </label>
      {currentClass.extendedProps.address && (
        <label>
          <b>At:</b>{' '}
          {isEditing ? (
            <input
              type='text'
              name='address'
              value={formData.address}
              onChange={handleChange}
              className='border rounded-md p-1'
            />
          ) : (
            currentClass.extendedProps.address
          )}
        </label>
      )}
      {currentClass.extendedProps.bookingPrice && (
        <label>
          <b>Booking price:</b>{' '}
          {isEditing ? (
            <input
              type='number'
              name='bookingPrice'
              value={formData.bookingPrice}
              onChange={handleChange}
              className='border rounded-md p-1'
            />
          ) : (
            `$${currentClass.extendedProps.bookingPrice}`
          )}
        </label>
      )}
      <p>
        <b>Available slots:</b> {currentClass.extendedProps.availableSlots}
      </p>
      <div>
        <b>Registered participants:</b>
        <ul className='mt-1'>
          {currentClass.extendedProps.bookings.map((b: ExtendedBooking) => (
            <li key={b.id} className='flex items-center gap-2'>
              {b.user.name}
              {isEditing && (
                <button
                  type='button'
                  title='Delete'
                  onClick={() => handleRemoveParticipant(b.id)}
                  className='text-red-500 font-bold cursor-pointer'
                >
                  X
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className='flex gap-3 self-center mt-3'>
        {isEditing ? (
          <>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        ) : (
          <>
            {currentClass.extendedProps.status !== ClassStatus.CANCELLED && (
              <Button onClick={() => setIsEditing(true)}>Edit class</Button>
            )}
            {currentClass.extendedProps.status !== ClassStatus.CANCELLED && (
              <Button onClick={handleCancelClass} variant='danger'>
                Cancel class
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
