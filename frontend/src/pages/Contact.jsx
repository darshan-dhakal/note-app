import Layouts from "../components/Layouts";
import { Card, Button, TextInput, Textarea, Label } from "flowbite-react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";

export default function Contact() {
  return (
    <Layouts>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 dark:text-white">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question, feedback, or need support? We’d love to hear from
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Send a Message</h2>

            <form className="flex flex-col gap-4">
              <div>
                <Label htmlFor="name" value="Your Name" />
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" value="Email Address" />
                <TextInput
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message" value="Message" />
                <Textarea
                  id="message"
                  placeholder="Write your message..."
                  rows={5}
                  required
                />
              </div>

              <Button color="dark" type="submit">
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="bg-black dark:bg-gray-700 text-white p-3 rounded-xl">
                  <HiOutlineMail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    imdarshandhakal@gmail.com
                  </p>
                </div>
              </div>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="bg-black dark:bg-gray-700 text-white p-3 rounded-xl">
                  <HiOutlinePhone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">+977-9767393973</p>
                </div>
              </div>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="bg-black dark:bg-gray-700 text-white p-3 rounded-xl">
                  <HiOutlineLocationMarker className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Nepal</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layouts>
  );
}
