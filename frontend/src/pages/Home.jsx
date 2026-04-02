import { Layouts } from "../components/Layouts";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PlusIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  PencilSquareIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";

export function Home() {
  const features = [
    {
      title: "Smart Writing Space",
      description:
        "Capture ideas quickly with an editor built for clean, distraction-free writing.",
      icon: PencilSquareIcon,
    },
    {
      title: "Reliable Reminders",
      description:
        "Attach reminder schedules to notes and never miss action items.",
      icon: BellAlertIcon,
    },
    {
      title: "Protected Workspace",
      description:
        "Secure authentication keeps your personal notes and plans private.",
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <Layouts>
      <section className="section-shell py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl px-6 py-10 text-center md:px-12"
        >
          <p className="mb-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
            Modern Notes + Reminders
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Plan faster, remember better, and keep every note organized.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300 md:text-lg">
            Notify gives you a clean workspace for writing notes, managing tasks, and setting reminders that keep your day on track.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button as={Link} to="/note" color="blue" className="px-4" pill>
              <PlusIcon className="mr-2 h-5 w-5" />
              New Note
            </Button>
            <Button as={Link} to="/note" color="light" className="px-4" pill>
              <DocumentTextIcon className="mr-2 h-5 w-5" />
              Open Workspace
            </Button>
          </div>
        </motion.div>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            ["Quick Capture", "Write and save in seconds"],
            ["Reminder Ready", "Date-time reminders on notes"],
            ["Fully Responsive", "Works cleanly on all screens"],
          ].map(([title, subtitle]) => (
            <div key={title} className="glass-card rounded-2xl p-4">
              <p className="font-semibold text-slate-800 dark:text-white">{title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-300">{subtitle}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
            >
              <Card className="glass-card h-full rounded-2xl border-0 p-1">
                <feature.icon className="mb-4 h-10 w-10 text-blue-600 dark:text-blue-300" />
                <h5 className="text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h5>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </Layouts>
  );
}
