import type { CreateClassSchema, LoginResponseDTO } from 'booking-backend';
import { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Spinner } from './Spinner';

export interface CreateClassFormProps {
  onSubmit: (data: CreateClassSchema) => void;
  user: LoginResponseDTO;
  loading?: boolean;
  error?: string;
  successMessage?: string;
}

export function CreateClassForm({
  onSubmit,
  loading,
  error,
  successMessage,
  user,
}: CreateClassFormProps) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [totalSlots, setTotalSlots] = useState(0);
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
  };

  const buttonType = loading ? 'loading' : 'primary';

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex flex-col items-center gap-5 max-w-2xl p-6 rounded-2xl bg-[url("/texture.webp")] bg-cover bg-center  text-white overflow-hidden shadow-sm'
    >
      <div className='absolute inset-0 bg-black/30 z-0' />
      <div className='relative z-10'>
        <img
          src='/logo.png'
          alt='Logo'
          width='200'
          height='200'
          className='mx-auto rounded-full bg-white p-4 shadow-md backdrop-blur-sm justify-self-center'
        />
        <h1 className='text-center text-3xl font-bold my-5'>
          Create a new class
        </h1>
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
              label='Total Slots'
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

        {error && (
          <p className=' bg-white/80 text-sm text-red-600  w-full text-center rounded-md px-3 py-1 mt-3'>
            {error}
          </p>
        )}
        {successMessage && (
          <p className='text-green-600 bg-white/80 w-full text-center rounded-md px-3 py-1 mt-3 text-sm'>
            {successMessage}
          </p>
        )}

        <Button
          children={
            loading ? (
              <span className='flex items-center gap-2'>
                <Spinner size={20} className='shrink-0' />
                Loading...
              </span>
            ) : (
              'Create class'
            )
          }
          type='submit'
          onClick={() => {}}
          variant={buttonType}
          className='mt-7 w-40 shadow-2xs shadow-slate-400/80 justify-self-center'
        />
      </div>
    </form>
  );
}
