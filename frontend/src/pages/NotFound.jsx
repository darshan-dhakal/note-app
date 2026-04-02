import React from "react";
import { Link } from "react-router-dom";
import Layouts from "../components/Layouts";

export function NotFound() {
  return (
    <Layouts>
      <div className="section-shell flex min-h-[72vh] items-center justify-center py-10">
        <div className="glass-card w-full max-w-xl rounded-3xl p-10 text-center">
          <h1 className="text-8xl font-bold text-slate-800 dark:text-slate-100 md:text-9xl">
            404
          </h1>
          <p className="mt-4 text-2xl font-semibold text-slate-700 dark:text-slate-200 md:text-3xl">
            Page Not Found
          </p>
          <p className="mb-8 mt-4 text-slate-600 dark:text-slate-300">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </Layouts>
  );
}

export default NotFound;
