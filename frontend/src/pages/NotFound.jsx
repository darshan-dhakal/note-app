import React from "react";
import { Link } from "react-router-dom";
import Layouts from "../components/Layouts";

export function NotFound() {
  return (
    <Layouts>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-200">
            404
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mt-4">
            Page Not Found
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-4 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </Layouts>
  );
}

export default NotFound;
