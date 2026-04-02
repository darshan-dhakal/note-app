import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button, Card, Label, TextInput } from "flowbite-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/reset-password/${token}`,
        { password }
      );

      setSuccess(res.data.message || "Password reset successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container flex min-h-screen items-center justify-center p-4">
      <Card className="glass-card w-full max-w-md rounded-2xl border-0 p-3">
        <h2 className="mb-2 text-center text-3xl font-bold text-slate-900 dark:text-white">
          Reset Password
        </h2>
        <p className="mb-6 text-center text-sm text-slate-500 dark:text-slate-300">
          Enter your new password to secure your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password" value="New Password" className="mb-1" />
            <TextInput
              id="password"
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" value="Confirm Password" className="mb-1" />
            <TextInput
              id="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          {success && <p className="text-sm font-medium text-green-600">{success}</p>}

          <Button type="submit" color="blue" className="w-full" isProcessing={loading} disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>

          <p className="text-center text-sm text-slate-600 dark:text-slate-300">
            Back to{" "}
            <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
              Login
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}

export { ResetPassword };
