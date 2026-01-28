import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { ForgotPassword } from "./pages/ForgotPassword.jsx";
import { ResetPassword } from "./pages/ResetPassword.jsx";
import { Home } from "./pages/Home.jsx";
import Note from "./pages/Note.jsx";
import { ProtectedRoutes } from "./components/ProtectedRoutes.jsx";
import { About } from "./pages/About.jsx";
import { Profile } from "./pages/Profile.jsx";
import Services from "./pages/Service.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import DarkModeProvider from "./context/DarkModeContext.jsx";

function App() {
  return (
    <>
      <DarkModeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/note"
              element={
                <ProtectedRoutes>
                  <Note />
                </ProtectedRoutes>
              }
            />

            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </DarkModeProvider>
    </>
  );
}

export default App;
