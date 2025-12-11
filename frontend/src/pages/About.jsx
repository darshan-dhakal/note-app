import Layouts from "../components/Layouts";
import { Card, Button } from "flowbite-react";
import {
  HiOutlineSparkles,
  HiOutlineCheckCircle,
  HiOutlinePencilAlt,
} from "react-icons/hi";

export function About() {
  return (
    <Layouts>
      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              About the Note App
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A simple, fast, and secure way to capture your thoughts, ideas,
              and important notes. Designed to help you stay organized and
              productive every day.
            </p>
          </div>

          {/* Main Highlight Card */}
          <Card className="p-10 bg-white shadow-xl border border-gray-200 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              <div className="flex-shrink-0 h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center">
                <HiOutlineSparkles className="h-12 w-12 text-blue-600" />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-gray-800">
                  Designed for Simplicity and Speed
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  The Note App is built to streamline your writing workflow. No
                  distractions, no unnecessary features. Just clean and
                  intuitive note-taking tailored for students, developers,
                  creators, and anyone who wants to stay organized.
                </p>
              </div>
            </div>
          </Card>

          {/* Features Section */}
          <div className="space-y-8">
            <h2 classname="text-2xl font-bold text-gray-900 text-center">
              Powerful Features with Minimal Effort
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center shadow-lg rounded-xl border border-gray-200">
                <HiOutlinePencilAlt className="h-10 w-10 mx-auto text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Easy Note Editing
                </h3>
                <p className="text-gray-600 mt-2">
                  Create, edit, and update notes instantly with a clean user
                  interface.
                </p>
              </Card>

              <Card className="p-6 text-center shadow-lg rounded-xl border border-gray-200">
                <HiOutlineCheckCircle className="h-10 w-10 mx-auto text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Organized Layout
                </h3>
                <p className="text-gray-600 mt-2">
                  Your notes are neatly displayed so you can find what you need
                  quickly.
                </p>
              </Card>

              <Card className="p-6 text-center shadow-lg rounded-xl border border-gray-200">
                <HiOutlineSparkles className="h-10 w-10 mx-auto text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">
                  User-friendly Experience
                </h3>
                <p className="text-gray-600 mt-2">
                  A fast and intuitive UI that feels smooth whether you're on
                  desktop or mobile.
                </p>
              </Card>
            </div>
          </div>

          {/* Mission / Closing Section */}
          <Card className="p-10 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg border border-gray-200">
            <div className="space-y-6 text-center">
              <h2 className="text-3xl font-semibold text-gray-900">
                Our Mission
              </h2>
              <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                We believe that productivity tools should be simple, elegant,
                and enjoyable to use. The Note App focuses on delivering a
                seamless experience that empowers you to capture your ideas and
                stay organized without friction. Whether it's planning your day,
                storing important content, or outlining projects, this app is
                built to support your workflow.
              </p>

              <Button size="lg" className="mx-auto px-10">
                Start Writing Now
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layouts>
  );
}
