import { Layouts } from "../components/Layouts";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export function Home() {
  return (
    <Layouts>
      <section className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero Section */}
        <div className="text-center py-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Welcome to Notify
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create, organize, and manage your personal notes. Set reminders for
            your work and todos. Created for you with a clean user interface
            powered by React, Vite, and Flowbite components.
          </p>

          {/* Call-to-action Buttons */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <Link to="/note">
              <Button color="blue" className="flex items-center gap-2">
                <PlusIcon className="w-5 h-5" />
                Create Note
              </Button>
            </Link>

            <Link to="/note">
              <Button color="gray" className="flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5" />
                View Notes
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Card className="hover:shadow-lg transition-shadow">
            <PencilSquareIcon className="w-12 h-12 text-blue-600 mb-3" />
            <h5 className="text-xl font-semibold">Easy Editing</h5>
            <p className="text-gray-600">
              Quickly update and format your notes with a user-friendly editor.
            </p>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <ShieldCheckIcon className="w-12 h-12 text-green-600 mb-3" />
            <h5 className="text-xl font-semibold">Secure Access</h5>
            <p className="text-gray-600">
              Only authenticated users can create, edit, or delete notes.
            </p>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <DocumentTextIcon className="w-12 h-12 text-purple-600 mb-3" />
            <h5 className="text-xl font-semibold">Organized Management</h5>
            <p className="text-gray-600">
              Keep your notes well-organized and accessible from anywhere.
            </p>
          </Card>
        </div>
      </section>
    </Layouts>
  );
}
