import { Link } from 'react-router-dom';
import { Button } from './Button';
import type { UserResponseDTO } from 'booking-backend';


export interface HeaderProps {
  user?: UserResponseDTO;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const Header = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount,
}: HeaderProps) => (
  <header className='w-full'>
    <div className='w-full flex justify-between items-center border-b border-white px-2 md:px-5 py-4'>
      <div className='flex gap-2 items-center'>
        <Link to='/'>
        <img
          src='/logo.png'
          alt='Logo'
          width='80'
          height='80'
          className='mx-auto rounded-full bg-white p-2 shadow-md backdrop-blur-sm justify-self-center'
        />
        </Link>
        <h1 className='hidden md:flex'>Yoga Studio</h1>
      </div>
      <div className='flex gap-1 md:gap-2 items-center'>
        {user ? (
          <>
            <span>
              Welcome, <b>{user.name}</b>!
            </span>
            <Button className='text-sm md:text-md text-nowrap' onClick={onLogout}>Log out</Button>
          </>
        ) : (
          <>
            <Button onClick={onLogin}>Log in</Button>
            <Button onClick={onCreateAccount} variant='primary'>
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
  </header>
);
