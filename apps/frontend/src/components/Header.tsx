import { Button } from './Button';

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
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
    <div className='w-full flex justify-between items-center border-b border-white px-5 py-4'>
      <div className='flex gap-1 items-center'>
        <img src='/logo.webp' alt='Logo' width='90' height='90' />
        <h1>Yoga Studio</h1>
      </div>
      <div className='flex gap-2 items-center'>
        {user ? (
          <>
            <span>
              Welcome, <b>{user.name}</b>!
            </span>
            <Button onClick={onLogout}>Log out</Button>
          </>
        ) : (
          <>
            <Button onClick={onLogin}>Log in</Button>
            <Button onClick={onCreateAccount} variant='primary'>Sign up</Button>
          </>
        )}
      </div>
    </div>
  </header>
);
