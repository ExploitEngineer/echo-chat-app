import { useEffect } from "react";
import Navbar from "./components/pages/navbar";
import HomePage from "./components/pages/home-page.tsx";
import SignUpPage from "./components/pages/signup-page.tsx";
import LoginPage from "./components/pages/login-page.tsx";
import SettingsPage from "./components/pages/settings-page.tsx";
import ProfilePage from "./components/pages/profile-page.tsx";
import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.ts";

export default function App() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}
