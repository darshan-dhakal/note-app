import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { ForgotPassword } from "./pages/ForgotPassword.jsx";
import { ResetPassword } from "./pages/ResetPassword.jsx";
// import { Dashboard } from "./pages/Dashboard.jsx";
import { Home } from "./pages/Home.jsx";
import { Note } from "./pages/Note.jsx";
import { ProtectedRoutes } from "./components/ProtectedRoutes.jsx";
function App() {
  return (
    <>
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
