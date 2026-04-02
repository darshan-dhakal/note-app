import { useState } from "react";
import axios from "axios";
import Layouts from "../components/Layouts";
import { Button, Label, TextInput, Card } from "flowbite-react";
import { Link } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,

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
    } finally {
      setLoading(false); // NEW
    }
  };

  return (
    <Layouts>
      <div className="section-shell flex min-h-[80vh] items-center justify-center py-10">
        <Card className="glass-card w-full max-w-md rounded-2xl border-0 p-3">
          <h2 className="mb-2 text-center text-3xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
          <p className="mb-6 text-center text-sm text-slate-500 dark:text-slate-300">Sign in to continue to your notes workspace.</p>

          {error && (
            <p className="mb-3 text-center text-sm font-semibold text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email" value="Email" className="mb-1" />
              <TextInput
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="password" value="Password" className="mb-1" />
              <TextInput
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="flex flex-col items-center text-sm text-slate-600 dark:text-slate-300">
              <div className="flex flex-row items-center gap-1">
                <span>Don't have an account?</span>
                <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
                  Sign up
                </Link>
              </div>

              <Link to="/forgot-password" className="mt-1 text-blue-600 hover:underline dark:text-blue-400">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              color="blue"
              className="w-full"
              disabled={loading}
              isProcessing={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Card>
      </div>
    </Layouts>
  );
}
