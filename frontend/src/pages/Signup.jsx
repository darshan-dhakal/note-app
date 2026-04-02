import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/userSchema";
import Layouts from "../components/Layouts";
import { Label, TextInput, Card, Button, Select, Toast } from "flowbite-react";
import { HiMail, HiCheck } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const watchAge = watch("age");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false); // NEW

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = data;

      if (!payload.gender) {
        delete payload.gender;
      }

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/`,
        payload
      );

      setShowToast(true); // SHOW TOAST

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
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
        <div className="fixed right-5 top-5 z-50">
          <Toast>
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-500">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Account created successfully!
            </div>
          </Toast>
        </div>
      )}

      <div className="section-shell flex min-h-[84vh] items-center justify-center py-8">
        <Card className="glass-card w-full max-w-lg rounded-2xl border-0 p-3">
          <h2 className="mb-2 text-center text-3xl font-bold text-slate-900 dark:text-white">
            Create Account
          </h2>
          <p className="mb-6 text-center text-sm text-slate-500 dark:text-slate-300">Create your workspace to start writing notes and setting reminders.</p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <Label htmlFor="name" value="Full Name" />
              <TextInput
                id="name"
                type="text"
                placeholder="Full Name"
                {...register("name")}
              />
              <p className="text-red-600 text-sm mt-1">
                {errors.name?.message}
              </p>
            </div>

            <div>
              <Label htmlFor="email" value="Email Address" />
              <TextInput
                id="email"
                type="text"
                icon={HiMail}
                placeholder="Email address"
                {...register("email")}
              />
              <p className="text-red-600 text-sm mt-1">
                {errors.email?.message}
              </p>
            </div>

            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                placeholder="Create password"
                {...register("password")}
              />
              <p className="text-red-600 text-sm mt-1">
                {errors.password?.message}
              </p>
            </div>

            <div>
              <Label htmlFor="confirmPassword" value="Confirm Password" />
              <TextInput
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword")}
              />
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword?.message}
              </p>
            </div>

            <div>
              <Label htmlFor="age" value="Your Age" />
              <TextInput
                id="age"
                type="number"
                placeholder="Enter your age"
                {...register("age")}
              />
              <p className="text-red-600 text-sm mt-1">{errors.age?.message}</p>
            </div>

            {Number(watchAge) > 18 && (
              <div>
                <Label htmlFor="gender" value="Gender" />
                <Select id="gender" {...register("gender")}>
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </Select>
                <p className="text-red-600 text-sm mt-1">
                  {errors.gender?.message}
                </p>
              </div>
            )}

            <p className="text-center text-sm text-slate-600 dark:text-slate-300">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                Login
              </Link>
            </p>

            <Button type="submit" color="blue" className="w-full">
              Signup
            </Button>
          </form>
        </Card>
      </div>
    </Layouts>
  );
}

export { Signup };
