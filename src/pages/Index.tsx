import { useState } from "react";
import Landing from "./Landing";
import Login from "./Login";
import MainCalendar from "./MainCalendar";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'main'>('landing');

  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  const handleLoginSuccess = () => {
    setCurrentPage('main');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

  return (
    <div className="overflow-hidden">
      <div className="transition-all duration-500 ease-in-out">
        {currentPage === 'landing' && (
          <div className="animate-fade-in">
            <Landing onGetStarted={handleGetStarted} />
          </div>
        )}
        {currentPage === 'login' && (
          <div className="animate-fade-in">
            <Login onLoginSuccess={handleLoginSuccess} onBackToLanding={handleBackToLanding}
             />
          </div>
        )}
        {currentPage === 'main' && (
          <div className="animate-fade-in">
            <MainCalendar onBackToLogin={handleBackToLogin} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
