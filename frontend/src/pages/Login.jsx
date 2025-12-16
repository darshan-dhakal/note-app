import { useState } from "react";
import axios from "axios";
import Layouts from "../components/Layouts";
import { Button, Label, TextInput, Card } from "flowbite-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "${import.meta.env.VITE_API_BASE_URL}/api/users/login",
        {
          email,
          password,
        }
      );

      const { accessToken, user } = res.data.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);

      window.location.href = "/note";
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <Layouts>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          {error && (
            <p className="text-red-600 text-center mb-3 text-sm font-semibold">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <Label htmlFor="email" value="Email" className="mb-1" />
              <TextInput
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" value="Password" className="mb-1" />
              <TextInput
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Links */}
            <div className="flex flex-col items-center text-sm text-gray-600">
              <div className="flex flex-row items-center gap-1">
                <span>Don't have an account?</span>
                <a href="/signup" className="hover:underline text-blue-600">
                  Sign up
                </a>
              </div>

              <a
                href="/forgot-password"
                className="hover:underline mt-1 text-blue-600"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <Button type="submit" color="dark" className="w-full">
              Login
            </Button>
          </form>
        </Card>
      </div>
    </Layouts>
  );
}
