import './App.css';
import { Header } from './components/Header';
import type { UserResponseDTO } from 'booking-backend';
import { useState } from 'react';
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import { Login } from './pages/Login';
import Home from './pages/Home';
import { PrivacyPolicies } from './pages/PrivacyPolicies';
import type { RegisterSchema, LoginSchema } from 'booking-backend';
import { Signin } from './pages/Signin';

interface LayoutProps {
  user: UserResponseDTO | undefined;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

function Layout({ user, onLogin, onLogout, onCreateAccount }: LayoutProps) {
  return (
    <div className='min-h-screen'>
      <Header
        user={user}
        onLogin={onLogin}
        onLogout={onLogout}
        onCreateAccount={onCreateAccount}
      />
      <main className='mt-20'>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  const [user, setUser] = useState<UserResponseDTO | undefined>(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const onLogin = () => navigate('/login');
  const onCreateAccount = () => navigate('/signin');

  const onLoginSubmit = async (data: LoginSchema) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Login error');
      }

      const responseData = await res.json();
      setUser(responseData);
      setSuccessMessage('Successfully logged in');
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setTimeout(() => {
          setError('');
        }, 4000);
      }
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    setLoading(true);
    setError('');
    try {
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(undefined);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setTimeout(() => {
          setError('');
        }, 4000);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSignin = async (data: RegisterSchema) => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Signin error');
      }
      setSuccessMessage('Successfully registered');
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setTimeout(() => {
          setError('');
        }, 4000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Routes>
      <Route
        element={
          <Layout
            user={user}
            onLogin={onLogin}
            onLogout={onLogout}
            onCreateAccount={onCreateAccount}
          />
        }
      >
        <Route path='/' element={<Home />} />
        <Route
          path='/login'
          element={
            <Login
              error={error}
              onSubmit={onLoginSubmit}
              loading={loading}
              successMessage={successMessage}
            />
          }
        />
        <Route
          path='/signin'
          element={
            <Signin
              error={error}
              onSubmit={onSignin}
              loading={loading}
              successMessage={successMessage}
            />
          }
        />
        <Route path='/privacy-policies' element={<PrivacyPolicies />} />
      </Route>
    </Routes>
  );
}

export default App;
