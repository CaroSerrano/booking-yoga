import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import type { CreateClassDTO, UserResponseDTO } from 'booking-backend';
import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import { Login } from './pages/Login';
import Home from './pages/Home';
import { PrivacyPolicies } from './pages/PrivacyPolicies';
import type { RegisterSchema, LoginSchema } from 'booking-backend';
import { Signin } from './pages/Signin';
import CalendarPage from './pages/CalendarPage';
import type { EventInput } from '@fullcalendar/core/index.js';
import { fetchClasses } from './useCases/fetchClasses';
import { getCurrentUser } from './useCases/getCurrentUser';
import { loginUser } from './useCases/loginUser';
import { logoutUser } from './useCases/logoutUser';
import { registerUser } from './useCases/registerUser';
import { createClass } from './useCases/createClass';
import PaymentSuccess from './pages/PaymentSuccess';

interface LayoutProps {
  user?: UserResponseDTO;
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

  const getClasses = async () => {
    try {
      const result = await fetchClasses();
      setClasses(result);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await getCurrentUser();
        setUser(result);
      } catch {
        setUser(undefined);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (user) getClasses();
  }, [user]);

  const navigate = useNavigate();
  const onLogin = () => navigate('/login');
  const onCreateAccount = () => navigate('/signin');

  const onLoginSubmit = async (data: LoginSchema) => {
    setLoading(true);

    try {
      const result = await loginUser(data);
      setUser(result);
      navigate('/calendar');
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
      await logoutUser();
      setUser(undefined);
      navigate('/');
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
      await registerUser(data);
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
      await createClass(data);
      toast.success('Class created successfully');
      await getClasses();
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
              fetchClasses={getClasses}
            />
          }
        />
        <Route path='/privacy-policies' element={<PrivacyPolicies />} />
        <Route path='/success' element={<PaymentSuccess email={user?.email} />} />
      </Route>
    </Routes>
  );
}

export default App;
