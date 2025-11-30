import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/userSchema";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    age: 0,
    gender: "",
  });
  const [error, setError] = useState("");

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //    setForm((prev) => {
  //       if (name === "age") {
  //       const intAge = parseInt(value)||0;
  //       return { ...prev, age: intAge , gender: intAge>18 ? prev.gender : ""};
  //       }
  //       return { ...prev, [name]: value };
  //     })
  //     // [name]: value
  //   }
  // }
  const handleChange = (e) => {
    const { name, value } = e.target; // <-- important

    setForm((prev) => {
      if (name === "age") {
        const intAge = parseInt(value) || 0;
        // Clear gender if age <= 18
        return { ...prev, age: intAge, gender: intAge > 18 ? prev.gender : "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/users/", form);

      alert("Account created successfully!");
      console.log("User:", res.data);

      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        // margin: "auto",
        // marginTop: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
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
        <h2 style={{ textAlign: "center" }}>Create Account</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            />
          </div>
          <div>
            <div style={{ marginTop: "10px" }}>Enter you age</div>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                name="age"
                placeholder="Enter you age"
                value={form.age}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px", marginTop: "10px" }}
              />
            </div>
          </div>
          {form.age > 18 && (
            <div>
              <div style={{ marginTop: "10px" }}>Select your gender</div>
              <div style={{ display: "flex" }}>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "10px", marginTop: "10px" }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            Already have an account? <a href="/login">Login</a>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "15px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
export { Signup };
