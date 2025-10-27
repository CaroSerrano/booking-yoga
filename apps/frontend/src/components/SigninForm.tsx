import type { RegisterSchema } from 'booking-backend';
import { useEffect, useState } from 'react';
import { Input } from './Input';
import { FaEye, FaEyeSlash, FaExternalLinkAlt } from 'react-icons/fa';
import { Button } from './Button';
import { Link } from 'react-router-dom';

export interface SigninFormProps {
  onSubmit: (data: RegisterSchema) => void;
  loading?: boolean;
  error?: string;
  successMessage?: string;
  showPassword?: boolean;
}

const adminEmails = ['caro@example.com', 'admin@example.com'];

export function SigninForm({
  onSubmit,
  loading,
  error,
  successMessage,
  showPassword,
}: SigninFormProps) {
  const [visible, setVisible] = useState(showPassword);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'USER'>('USER');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, name, phoneNumber, role });
  };

  const buttonType = loading ? 'loading' : 'primary';
  useEffect(() => {
    if (adminEmails.includes(email)) {
      setRole('ADMIN');
    }
  }, [email]);

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex flex-col items-center w-full gap-5 max-w-lg  p-10 rounded-2xl bg-[url("/texture.webp")] bg-cover bg-center  text-white overflow-hidden shadow-sm'
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
        <h1 className='text-center text-3xl font-bold my-5'>Sign in</h1>
        <div className='w-full text-start flex flex-col gap-2'>
          <Input
            id='fname'
            label='Name'
            flexCol={true}
            name='name'
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={loading}
            required
          />
          <Input
            id='femail'
            label='Email'
            flexCol={true}
            name='email'
            placeholder='email@example.com'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={loading}
            required
          />
          <div className='relative flex items-center gap-3'>
            <Input
              id='fpassword'
              label='Password'
              flexCol={true}
              name='password'
              type={visible ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              disabled={loading}
              required
            />
            {visible ? (
              <FaEyeSlash
                size={20}
                onClick={() => setVisible(!visible)}
                className='cursor-pointer relative top-4'
                title='Hide password'
              />
            ) : (
              <FaEye
                size={20}
                onClick={() => setVisible(!visible)}
                className='cursor-pointer relative top-4'
                title='Show password'
              />
            )}
          </div>
          <Input
            id='fphone'
            label='Phone number'
            flexCol={true}
            name='phoneNumber'
            type='text'
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            disabled={loading}
            required
          />
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
          <div className='flex gap-2 items-center'>
            <Input
              id='fterms'
              label='I accept the privacy policies'
              flexCol={false}
              type='checkbox'
              value='true'
              name='acceptPrivacy'
              required
            />
            <Link to='/privacy-policies'>
              <FaExternalLinkAlt size={15} />
            </Link>
          </div>
        </div>
        <Button
          children={loading ? 'Loading...' : 'Sign in'}
          type='submit'
          onClick={() => {}}
          variant={buttonType}
          className='mt-7 w-30 shadow-2xs shadow-slate-400/80 justify-self-center'
        />
      </div>
    </form>
  );
}
