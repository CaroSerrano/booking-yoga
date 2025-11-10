import { setStatusColor } from '../../utils/setStatusColor';
import type { ClassDetails } from './AdminClassDetails';
import { type Booking, ClassStatus } from 'booking-domain';
import { Button, type ButtonVariant } from './Button';
import toast from 'react-hot-toast';
import type { UserResponseDTO } from 'booking-backend';
import { createBooking } from '../useCases/createBooking';
import { listBookings } from '../useCases/listBookings';
import { createCheckoutSession } from '../useCases/createCheckoutSession';
import { useCallback, useEffect, useState } from 'react';

const BASE_URL = process.env.FRONTEND_URL;

export interface StudentClassDetailsProps {
  currentClass: ClassDetails | null;
  user: UserResponseDTO;
}

export default function StudentClassDetails({
  currentClass,
  user,
}: StudentClassDetailsProps) {
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const fetchBookings = useCallback(async () => {
    try {
      const result = await listBookings({ userId: user.id });
      setUserBookings(result);
    } catch {
      setUserBookings([]);
    }
  }, [user]);

  useEffect(() => {
    fetchBookings();
  }, [user, fetchBookings]);

  if (!currentClass)
    return (
      <div className='w-fit m-4 rounded-2xl py-3 bg-zinc-900 px-5'>
        Error getting class details. Please try again
      </div>
    );

  const classStatusColor = setStatusColor(currentClass.extendedProps.status);

  const handleBooking = async () => {
    try {
      await createBooking({ classId: currentClass.publicId, userId: user.id });
      const createdBooking = await listBookings({
        userId: user.id,
        classId: currentClass.publicId,
      });
      const session = await createCheckoutSession({
        bookingId: createdBooking[0].id,
        userId: user.id,
        amount: Number(currentClass.extendedProps.bookingPrice),
        currency: 'usd',
        successUrl: `${BASE_URL}/success`,
        cancelUrl: `${BASE_URL}/calendar`,
      });

      await fetchBookings();

      if (session.url) {
        window.open(session.url);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      toast.error('Error creating booking. Please try again');
    }
  };
  const alreadyBooked = userBookings
    .map((b) => b.classId)
    .includes(currentClass.publicId);

  const buttonText = alreadyBooked ? 'Class booked' : 'Book this class';

  let buttonVariant: ButtonVariant | undefined;
  if (currentClass.extendedProps.availableSlots <= 0 || alreadyBooked) {
    buttonVariant = 'disabled';
  } else {
    buttonVariant = undefined;
  }

  return (
    <div className='flex flex-col gap-2 bg-zinc-900 py-3 px-5 rounded-2xl max-w-xl'>
      <div className='flex justify-between items-center'>
        <h3 className='text-center border-b pb-2 font-bold text-xl'>
          {currentClass.title}
        </h3>
        <span
          className={`py-1 px-2 rounded-md ml-2 text-center text-sm ${classStatusColor}`}
        >
          {currentClass.extendedProps.status}
        </span>
      </div>
      <p>{currentClass.extendedProps.description}</p>
      <label>
        <b>Taught by:</b> {currentClass.extendedProps.teacher.name}
      </label>
      <label>
        <b>From:</b> {currentClass.start?.toLocaleString()}
      </label>
      <label>
        <b>To:</b> {currentClass.end?.toLocaleString()}
      </label>
      {currentClass.extendedProps.address && (
        <label>
          <b>At:</b> {currentClass.extendedProps.address}
        </label>
      )}
      {currentClass.extendedProps.bookingPrice && (
        <label>
          <b>Booking price: </b>${currentClass.extendedProps.bookingPrice}
        </label>
      )}
      <p>
        <b>Available slots: </b>
        {currentClass.extendedProps.availableSlots}
      </p>
      <div className='flex gap-3 self-center mt-3'>
        {currentClass.extendedProps.status !== ClassStatus.CANCELLED && (
          <Button variant={buttonVariant} onClick={handleBooking}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
