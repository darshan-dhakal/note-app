import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/userSchema";
import Layouts from "../components/Layouts";
import { Label, TextInput } from "flowbite-react";
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
      console.log(data);
      const { confirmPassword, ...payload } = data;
      if (!payload.gender) {
        delete payload.gender;
      }
      const res = await axios.post("http://localhost:3000/api/users/", payload);

      alert("Account created successfully!");
      console.log("User:", res.data);

      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <Layouts>
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

          {/* {errors && <p style={{ color: "red" }}>{errors}</p>} */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label>Your Full Name</Label>
              </div>
              <TextInput
                type="text"
                name="name"
                placeholder="Full Name"
                {...register("name")}
              />
            </div>
            <p style={{ color: "red" }}>{errors.name?.message}</p>
            <div className="max-w-md mt-2">
              <div className="mb-2 block">
                <Label>Your email</Label>
              </div>
              <TextInput
                type="email"
                icon={HiMail}
                placeholder="Email address"
                {...register("email")}
              />
            </div>
            <p style={{ color: "red" }}>{errors.email?.message}</p>
            <div className="mt-2 block">
              <Label>Password</Label>
            </div>
            <TextInput
              type="password"
              name="password"
              placeholder="Create password"
              {...register("password")}
            />
            <p style={{ color: "red" }}>{errors.password?.message}</p>
            <div className="mt-2 block">
              <Label>Confirm Password</Label>
            </div>
            <TextInput
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword")}
            />
            <p style={{ color: "red" }}>{errors.confirmPassword?.message}</p>
            <div>
              <div className="mt-2 block">
                <Label>Enter Your Age</Label>
              </div>
              <TextInput
                type="number"
                placeholder="Enter you age"
                {...register("age")}
              />
              <p style={{ color: "red" }}>{errors.age?.message}</p>
            </div>
            {Number(watchAge) > 18 && (
              <div>
                <div style={{ marginTop: "10px" }}>Select your gender</div>
                <div style={{ display: "flex" }}>
                  <select
                    {...register("gender")}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <p style={{ color: "red" }}>{errors.gender?.message}</p>
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
    </Layouts>
  );
}
export { Signup };
