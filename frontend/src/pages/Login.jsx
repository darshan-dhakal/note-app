import { useState } from "react";
import axios from "axios";
import Layouts from "../components/Layouts";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });
      console.log(res);
      const { accessToken, user } = res.data.data;

      localStorage.setItem("token", accessToken);

      // alert("Login successful!");
      console.log("Logged in as:", user);

      window.location.href = "/note";
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <Layouts>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div
          style={{
            maxWidth: "400px",
            width: "100%",
            padding: "20px",
            borderRadius: "10px",
            background: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Login</h2>

          <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={{ display: "flex" }}>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "100%", padding: "10px", marginTop: "10px" }}
              />
            </div>
            <div style={{ display: "flex" }}>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  flex: "1",
                  marginTop: "10px",
                }}
              />
            </div>
            <p style={{ textAlign: "center" }}>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
            <p style={{ textAlign: "center" }}>
              <a href="/forgot-password">Forgot password?</a>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <a
                href="/change-password"
                style={{ textDecoration: "none", color: "#646cff" }}
              ></a>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "15px",
                backgroundColor: "black",
                color: "white",
                borderRadius: "5px",
                border: "none",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Layouts>
  );
}

export { Login };
