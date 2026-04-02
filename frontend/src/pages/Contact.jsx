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
      <div className="section-shell py-10">
        <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight dark:text-white">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-300">
            Have a question, feedback, or need support? We’d love to hear from
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="glass-card rounded-2xl border-0">
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

              <Button color="blue" type="submit">
                Send Message
              </Button>
            </form>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="glass-card rounded-2xl border-0">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-blue-600 p-3 text-white">
                  <HiOutlineMail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">Email</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    imdarshandhakal@gmail.com
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card rounded-2xl border-0">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-blue-600 p-3 text-white">
                  <HiOutlinePhone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">Phone</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">+977-9767393973</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card rounded-2xl border-0">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-blue-600 p-3 text-white">
                  <HiOutlineLocationMarker className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">Location</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Nepal</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </Layouts>
  );
}
