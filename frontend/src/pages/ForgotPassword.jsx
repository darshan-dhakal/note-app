import { useState } from "react";
import axios from "axios";
import Layouts from "../components/Layouts";
import { Label, TextInput, Card, Button, Toast } from "flowbite-react";
import { HiMail, HiCheck } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/forgot-password`,
        { email }
      );

      setShowToast(true);

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Forgot password failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layouts>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"></div>
        </div>
      )}

      {showToast && (
        <div className="fixed top-5 right-5 z-50">
          <Toast>
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-500">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Password reset link sent to your email!
            </div>
          </Toast>
        </div>
      )}

      <div className="section-shell flex min-h-[80vh] items-center justify-center py-10">
        <Card className="glass-card w-full max-w-md rounded-2xl border-0 p-3">
          <h2 className="mb-2 text-center text-3xl font-bold dark:text-white">
            Forgot Password
          </h2>
          <p className="mb-6 text-center text-sm text-slate-500 dark:text-slate-300">Enter your account email to receive a reset link.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email" value="Email Address" />
              <TextInput
                id="email"
                type="email"
                icon={HiMail}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              {error && (
                <p className="text-red-600 text-sm mt-1">{error}</p>
              )}
            </div>

            <p className="text-center text-sm text-slate-600 dark:text-slate-300">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                Login
              </Link>
            </p>

            <Button type="submit" color="blue" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </Card>
      </div>
    </Layouts>
  );
}

export { ForgotPassword };
