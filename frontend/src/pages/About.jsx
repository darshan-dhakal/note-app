import Layouts from "../components/Layouts";
import { Card } from "flowbite-react";
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
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A modern note-taking application designed to help you capture,
            organize, and remember your ideas effortlessly.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to provide a secure, intuitive, and reliable note
            management platform that helps individuals stay productive and
            organized. Whether it’s daily tasks, important ideas, or long-term
            goals, our app ensures your notes are always accessible and safe.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="hover:shadow-lg transition">
              <div className="flex gap-4">
                <div className="bg-black text-white p-3 rounded-xl h-fit">
                  <value.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tech Stack / Built With */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-semibold mb-4">
            Built With Modern Tech
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This application is built using modern web technologies including
            React, Node.js, PostgreSQL, and secure REST APIs to ensure
            performance, scalability, and reliability.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-3">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Create an account and start organizing your notes today.
          </p>
          <a
            href="/login"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Join Now
          </a>
        </div>
      </div>
    </Layouts>
  );
}
export default About;
