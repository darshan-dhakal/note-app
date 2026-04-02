import Layouts from "../components/Layouts";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  HiOutlineLightBulb,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUsers,
} from "react-icons/hi";

export function About() {
  const values = [
    {
      title: "Simplicity First",
      icon: HiOutlineLightBulb,
      description:
        "We believe note-taking should be simple, fast, and distraction-free so you can focus on what matters.",
    },
    {
      title: "Security & Privacy",
      icon: HiOutlineShieldCheck,
      description:
        "Your notes are private. We use secure authentication and modern best practices to protect your data.",
    },
    {
      title: "Modern Experience",
      icon: HiOutlineSparkles,
      description:
        "A clean UI, smooth interactions, and thoughtful design that feels good to use every day.",
    },
    {
      title: "User-Centered Design",
      icon: HiOutlineUsers,
      description:
        "Every feature is built with real users in mind — practical, useful, and easy to understand.",
    },
  ];

  return (
    <Layouts>
      <div className="section-shell py-10">
        <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight dark:text-white">About Notify</h1>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-300">
            A modern note-taking application designed to help you capture,
            organize, and remember your ideas effortlessly.
          </p>
        </div>

        <div className="glass-card mb-12 rounded-2xl p-8 text-center">
          <h2 className="mb-3 text-2xl font-semibold dark:text-white">Our Mission</h2>
          <p className="mx-auto max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Our mission is to provide a secure, intuitive, and reliable note
            management platform that helps individuals stay productive and
            organized. Whether it’s daily tasks, important ideas, or long-term
            goals, our app ensures your notes are always accessible and safe.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {values.map((value, index) => (
            <Card key={index} className="glass-card rounded-2xl border-0">
              <div className="flex gap-4">
                <div className="h-fit rounded-xl bg-blue-600 p-3 text-white">
                  <value.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-xl font-semibold dark:text-white">{value.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{value.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-semibold dark:text-white">
            Built With Modern Tech
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-300">
            This application is built using modern web technologies including
            React, Node.js, PostgreSQL, and secure REST APIs to ensure
            performance, scalability, and reliability.
          </p>
        </div>

        <div className="text-center">
          <h2 className="mb-3 text-2xl font-semibold dark:text-white">Ready to Get Started?</h2>
          <p className="mb-6 text-slate-600 dark:text-slate-300">
            Create an account and start organizing your notes today.
          </p>
          <Link
            to="/signup"
            className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Join Now
          </Link>
        </div>
        </div>
      </div>
    </Layouts>
  );
}
export default About;
