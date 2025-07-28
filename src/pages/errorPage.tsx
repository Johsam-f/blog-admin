import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black text-white">
      <div className="relative z-10 text-center p-4">
        <h1 className="text-7xl font-extrabold">404</h1>
        <p className="mt-4 text-2xl font-semibold">Oops! Page not found.</p>
        <p className="mt-2 mb-4 text-lg text-gray-300">
          Looks like you're lost in the desert.
        </p>
        <Link to={"/"} 
        className="mt-20 px-6 py-3 bg-red-600 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
        >
            Return to Home
        </Link>
      </div>
    </div>
  );
}
