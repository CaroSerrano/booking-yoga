import type { CreateClassDTO, LoginResponseDTO } from 'booking-backend';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Spinner } from './Spinner';

export interface CreateClassFormProps {
  onSubmit: (data: CreateClassDTO) => void;
  user: LoginResponseDTO;
  loading?: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export function CreateClassForm({
  onSubmit,
  loading,
  user,
  setOpenModal
}: CreateClassFormProps) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [totalSlots, setTotalSlots] = useState(10);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [bookingPrice, setBookingPrice] = useState<number | undefined>(
    undefined
  );
  const teacherId = user.id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      teacherId,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
      totalSlots,
      description,
      address,
      location,
      bookingPrice,
    });
    setOpenModal(false)
  };

  const buttonType = loading ? 'loading' : undefined;

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-zinc-900/90 relative flex flex-col items-center gap-5 max-w-2xl p-6 rounded-2xl  text-white overflow-hidden shadow-sm'
    >
      <div className='absolute inset-0 bg-black/30 z-0' />
      <div className='relative z-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-start'>
          <div className='flex flex-col gap-2'>
            <Input
              id='ftitle'
              label='Title'
              name='title'
              type='text'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              disabled={loading}
              required
            />
            <Input
              id='fstart'
              label='Start date and time'
              name='start'
              type='datetime-local'
              onChange={(e) => setStart(e.target.value)}
              value={start}
              disabled={loading}
              required
            />
            <Input
              id='fend'
              label='End date and time'
              name='end'
              type='datetime-local'
              onChange={(e) => setEnd(e.target.value)}
              value={end}
              disabled={loading}
              required
            />
            <Input
              id='ftotalSlots'
              label='Class capacity'
              name='totalSlots'
              type='number'
              onChange={(e) => setTotalSlots(Number(e.target.value))}
              value={String(totalSlots)}
              disabled={loading}
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Input
              id='fdescription'
              label='Description'
              name='description'
              type='text'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              disabled={loading}
            />
            <Input
              id='faddress'
              label='Address'
              name='address'
              type='text'
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              disabled={loading}
            />
            <Input
              id='flocation'
              label='Location'
              name='location'
              type='text'
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              disabled={loading}
            />
            <Input
              id='fprice'
              label='Booking price'
              name='bookingPrice'
              type='number'
              step='0.01'
              onChange={(e) => setBookingPrice(Number(e.target.value))}
              value={String(bookingPrice ?? '')}
              disabled={loading}
            />
          </div>
        </div>
        <Button
          children={
            loading ? (
              <span className='flex items-center gap-2'>
                <Spinner size={20} className='shrink-0' />
                Loading...
              </span>
            ) : (
              'Submit'
            )
          }
          type='submit'
          onClick={() => {}}
          variant={buttonType}
          className='mt-7 w-40 justify-self-center'
        />
      </div>
    </form>
  );
}
