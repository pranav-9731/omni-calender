import { Routes, Route, useNavigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Calendar from "./pages/MainCalendar";

export const AppRouter = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Landing
            onGetStarted={() => navigate("/login")}
          />
        }
      />

      <Route
        path="/login"
        element={
          <Login
            onLoginSuccess={() => navigate("/calendar")}
            onBackToLanding={() => navigate("/")}
          />
        }
      />

      <Route
        path="/calendar"
        element={
          <Calendar
            onBackToLogin={() => navigate("/login")}
          />
        }
      />
    </Routes>
  );
};

export default AppRouter;
