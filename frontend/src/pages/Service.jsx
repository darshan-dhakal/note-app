import Layouts from "../components/Layouts";
import { Card } from "flowbite-react";
import {
  HiOutlinePencilAlt,
  HiOutlineLockClosed,
  HiOutlineUserCircle,
  HiOutlineCloudUpload,
  HiOutlineTrash,
  HiOutlineBell,
} from "react-icons/hi";

export default function Services() {
  const services = [
    {
      title: "Note Creation & Editing",
      icon: HiOutlinePencilAlt,
      description:
        "Create, edit, and organize your notes seamlessly with a clean and distraction-free editor.",
    },
    {
      title: "Secure Authentication",
      icon: HiOutlineLockClosed,
      description:
        "Your data is protected with secure authentication and encrypted access using JWT-based authorization.",
    },
    {
      title: "User Profile Management",
      icon: HiOutlineUserCircle,
      description:
        "Manage your personal profile, update details, and upload a modern profile photo.",
    },
    {
      title: "Cloud-Based Storage",
      icon: HiOutlineCloudUpload,
      description:
        "All your notes are safely stored and accessible anytime from any device.",
    },
    {
      title: "Safe Deletion",
      icon: HiOutlineTrash,
      description:
        "Accidental deletions are prevented using confirmation modals before removing notes.",
    },
    {
      title: "Reminders & Alerts",
      icon: HiOutlineBell,
      description:
        "Set reminders on notes and get notified so you never miss important tasks.",
    },
  ];

  return (
    <Layouts>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your notes efficiently, securely, and
            beautifully — all in one place.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition">
              <div className="flex flex-col items-start gap-4">
                <div className="bg-black text-white p-3 rounded-xl">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-3">
            Start Organizing Your Ideas Today
          </h2>
          <p className="text-gray-600 mb-6">
            Join now and experience a smarter way to manage your notes.
          </p>
          <a
            href="/note"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </Layouts>
  );
}
