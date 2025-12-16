import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/userSchema";
import Layouts from "../components/Layouts";
import { Label, TextInput, Card, Button, Select } from "flowbite-react";
import { HiMail } from "react-icons/hi";

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

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...payload } = data;

      if (!payload.gender) {
        delete payload.gender;
      }

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/`,
        payload
      );

      alert("Account created successfully!");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <Layouts>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account
          </h2>

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

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>

            <Button type="submit" color="dark" className="w-full">
              Signup
            </Button>
          </form>
        </Card>
      </div>
    </Layouts>
  );
}

export { Signup };
