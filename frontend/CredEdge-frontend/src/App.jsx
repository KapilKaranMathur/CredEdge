import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import LandingPage from "./pages/LandingPage";
import UserProvider, { UserContext } from "./context/UserContext";
import ThemeProvider from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<Root />} />
              <Route
                path="/login"
                exact
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                exact
                element={
                  <PublicRoute>
                    <SignUp />
                  </PublicRoute>
                }
              />
              <Route
                path="/dashboard"
                exact
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/income"
                exact
                element={
                  <ProtectedRoute>
                    <Income />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expense"
                exact
                element={
                  <ProtectedRoute>
                    <Expense />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </div>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = React.useContext(UserContext);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>; // Replace with a nice spinner component if available
  }

  return user ? <Navigate to="/dashboard" /> : <LandingPage />;
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = React.useContext(UserContext);

  if (loading) {
     return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = React.useContext(UserContext);

  if (loading) {
     return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return user ? <Navigate to="/dashboard" /> : children;
};
