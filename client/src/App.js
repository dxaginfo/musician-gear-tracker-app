import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/auth/authSlice';
import { Container } from '@mui/material';

// Components
import Header from './components/layout/Header';
import PrivateRoute from './components/routing/PrivateRoute';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/Dashboard';
import GearList from './pages/gear/GearList';
import GearDetail from './pages/gear/GearDetail';
import GearForm from './pages/gear/GearForm';
import MaintenanceList from './pages/maintenance/MaintenanceList';
import MaintenanceForm from './pages/maintenance/MaintenanceForm';
import ReminderList from './pages/reminders/ReminderList';
import ReminderForm from './pages/reminders/ReminderForm';
import NotFound from './pages/NotFound';

function App() {
  const dispatch = useDispatch();
  const { token, isLoading } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
          
          <Route path="/gear" element={<PrivateRoute element={<GearList />} />} />
          <Route path="/gear/new" element={<PrivateRoute element={<GearForm />} />} />
          <Route path="/gear/:id" element={<PrivateRoute element={<GearDetail />} />} />
          <Route path="/gear/:id/edit" element={<PrivateRoute element={<GearForm />} />} />
          
          <Route path="/maintenance/:gearId" element={<PrivateRoute element={<MaintenanceList />} />} />
          <Route path="/maintenance/new/:gearId" element={<PrivateRoute element={<MaintenanceForm />} />} />
          <Route path="/maintenance/:id/edit" element={<PrivateRoute element={<MaintenanceForm />} />} />
          
          <Route path="/reminders" element={<PrivateRoute element={<ReminderList />} />} />
          <Route path="/reminders/new" element={<PrivateRoute element={<ReminderForm />} />} />
          <Route path="/reminders/:id/edit" element={<PrivateRoute element={<ReminderForm />} />} />
          
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
