import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { ForgotPassword } from "./pages/ForgotPassword.jsx";
import { ResetPassword } from "./pages/ResetPassword.jsx";
// import { Dashboard } from "./pages/Dashboard.jsx";
import { Home } from "./pages/Home.jsx";
import { Component as Note } from "./pages/Note.jsx";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Home />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/note" element={<Note />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
