import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import { Header, type User } from './components/Header';
import type { CreateClassDTO, UserResponseDTO } from 'booking-backend';
import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import { Login } from './pages/Login';
import Home from './pages/Home';
import { PrivacyPolicies } from './pages/PrivacyPolicies';
import type { RegisterSchema, LoginSchema } from 'booking-backend';
import { Signin } from './pages/Signin';
import CalendarPage from './pages/CalendarPage';
import { toEventObjects } from '../utils/classEventMapper';
import type { EventInput } from '@fullcalendar/core/index.js';

interface LayoutProps {
  user: User | undefined;
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
        <Toaster />
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  const [user, setUser] = useState<UserResponseDTO | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<EventInput[]>([]);

  const fetchClasses = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/class/extended', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Error getting classes');
      }

      const data = await res.json();
      setClasses(toEventObjects(data));
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/auth/currentUser', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch {
        setUser(undefined);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (user) fetchClasses();
  }, [user]);

  const navigate = useNavigate();
  const onLogin = () => navigate('/login');
  const onCreateAccount = () => navigate('/signin');

  const onLoginSubmit = async (data: LoginSchema) => {
    setLoading(true);

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
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    setLoading(true);
    try {
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(undefined);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSignin = async (data: RegisterSchema) => {
    try {
      setLoading(true);
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
      toast.success('Successfully registered');
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onCreateClass = async (data: CreateClassDTO) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/class', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Error creating a class');
      }
      toast.success('Class created successfully');
      await fetchClasses();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
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
        <Route path='/' element={<Home user={user} />} />
        <Route
          path='/login'
          element={<Login onSubmit={onLoginSubmit} loading={loading} />}
        />
        <Route
          path='/signin'
          element={<Signin onSubmit={onSignin} loading={loading} />}
        />
        <Route
          path='/calendar'
          element={
            <CalendarPage
              user={user}
              onSubmit={onCreateClass}
              loading={loading}
              classes={classes}
              fetchClasses={fetchClasses}
            />
          }
        />
        <Route path='/privacy-policies' element={<PrivacyPolicies />} />
      </Route>
    </Routes>
  );
}

export default App;
