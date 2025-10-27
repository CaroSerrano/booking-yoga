import { Button } from './Button';
import { Input } from './Input';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export interface LoginFormProps {
  onSubmit: (data: { email: string; pass: string }) => void;
  loading?: boolean;
  error?: string;
  successMessage?: string;
  defaultValues?: { email: string; password: string };
  showPassword?: boolean;
}

export function LoginForm({
  onSubmit,
  loading = false,
  error = '',
  successMessage = '',
  defaultValues = { email: '', password: '' },
  showPassword = false,
}: LoginFormProps) {
  const [email, setEmail] = useState(defaultValues.email);
  const [pass, setPassword] = useState(defaultValues.password);
  const [visible, setVisible] = useState(showPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, pass });
  };

  const buttonType = loading ? 'loading' : 'primary';

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
        <h1 className='text-center text-3xl font-bold my-5'>Log in</h1>
        <div className='max-w-90 text-start'>
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
          <div className='relative flex items-center gap-2'>
            <Input
              id='fpassword'
              label='Password'
              flexCol={true}
              name='password'
              type={visible ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              value={pass}
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

          {error && (
            <p className=' bg-white/80 text-sm text-red-600  w-fit rounded-md px-3 py-1 mt-3'>
              {error}
            </p>
          )}
          {successMessage && (
            <p className='text-green-600 bg-white/80 w-fit rounded-md px-3 py-1 mt-3 text-sm'>
              {successMessage}
            </p>
          )}
        </div>
        <Button
          children={loading ? 'Loading...' : 'Log in'}
          type='submit'
          onClick={() => {}}
          variant={buttonType}
          className='mt-7 w-30 shadow-2xs shadow-slate-400/80 justify-self-center'
        />
      </div>
    </form>
  );
}
