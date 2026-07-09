import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Calendar from "./pages/MainCalendar";

const RouterContent = () => {
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

const AppRouter = () => {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
};

export default AppRouter;
