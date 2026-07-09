import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Calendar from './pages/MainCalendar';

export const AppRouter = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
    navigate('/login');
  };

  const handleLoginSuccess = () => {
    navigate('/calendar');
  };

  const handleBackToLanding = () => {

    navigate('/');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Landing onGetStarted={handleGetStarted} />} 
      />
      <Route 
        path="/login" 
        element={
          <Login 
            onLoginSuccess={handleLoginSuccess}
            onBackToLanding={handleBackToLanding}
          />
        } 
      />
      <Route 
        path="/calendar" 
        element={<Calendar onBackToLogin={handleBackToLogin} />} 
      />
    </Routes>
  );
};

// Main AppRouter component
export const App = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};