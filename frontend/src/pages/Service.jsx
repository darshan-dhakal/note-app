import Layouts from "../components/Layouts";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
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
      <div className="section-shell py-10">
        <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight dark:text-white">Our Services</h1>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-300">
            Everything you need to manage your notes efficiently, securely, and
            beautifully — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="glass-card rounded-2xl border-0">
              <div className="flex flex-col items-start gap-4">
                <div className="rounded-xl bg-blue-600 p-3 text-white">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold dark:text-white">{service.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="mb-3 text-2xl font-semibold dark:text-white">
            Start Organizing Your Ideas Today
          </h2>
          <p className="mb-6 text-slate-600 dark:text-slate-300">
            Join now and experience a smarter way to manage your notes.
          </p>
          <Link
            to="/note"
            className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
        </div>
      </div>
    </Layouts>
  );
}
