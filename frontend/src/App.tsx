import { useEffect } from "react";
import Navbar from "./components/pages/navbar";
import HomePage from "./components/pages/home-page.tsx";
import SignUpPage from "./components/pages/signup-page.tsx";
import LoginPage from "./components/pages/login-page.tsx";
import SettingsPage from "./components/pages/settings-page.tsx";
import ProfilePage from "./components/pages/profile-page.tsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.ts";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { isCheckingAuth, authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}
