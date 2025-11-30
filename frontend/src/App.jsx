import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
// import { ForgotPassword } from "./pages/ForgotPassword.jsx";
import { ForgotPassword } from "./pages/ForgotPassword.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
