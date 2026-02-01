import { useState } from "react";
import axios from "axios";
import Layouts from "../components/Layouts";
import { Label, TextInput, Card, Button, Toast } from "flowbite-react";
import { HiMail, HiCheck } from "react-icons/hi";

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
      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-800"></div>
        </div>
      )}

      {/* Success Toast */}
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

      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">
        <Card className="w-full max-w-md shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
            Forgot Password
          </h2>

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

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{" "}
              <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                Login
              </a>
            </p>

            <Button type="submit" color="dark" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </Card>
      </div>
    </Layouts>
  );
}

export { ForgotPassword };
