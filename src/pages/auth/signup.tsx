import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/button";

function Signup() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState<"google" | "github" | null>(null);

  const handleGoogleSignup = async () => {
    setLoading("google");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/adminDashboard",
      });
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong with Google signup.");
      setLoading(null);
    }
  };

  const handleGithubSignup = async () => {
    setLoading("github");
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/adminDashboard",
      });
    } catch (error) {
      console.error(error);
      setErrorMsg("GitHub signup failed.");
      setLoading(null);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-md">
      <h1 className="mb-6 text-center text-2xl font-bold text-white">
        Sign Up to Find All blogs
      </h1>

      {/* --- Error Message --- */}
      {errorMsg && (
        <p className="mb-4 p-1 rounded-sm text-center bg-red-800 text-white">
          {errorMsg}
        </p>
      )}

      {/* Google Sign Up */}
      <Button
        onClick={handleGoogleSignup}
        variant="secondary"
        disabled={loading === "google"}
      >
        {loading === "google" ? (
          <span className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>
        ) : (
          <FcGoogle className="text-xl mr-2" />
        )}
        Continue with Google
      </Button>

      {/* GitHub Sign Up */}
      <Button
        onClick={handleGithubSignup}
        variant="secondary"
        className="mt-3"
        disabled={loading === "github"}
      >
        {loading === "github" ? (
          <span className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>
        ) : (
          <FaGithub className="text-xl mr-2 text-black" />
        )}
        Continue with GitHub
      </Button>

      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-gray-500"></div>
        <p className="mx-2 text-gray-300">or</p>
        <div className="h-px flex-1 bg-gray-500"></div>
      </div>

      <div className="mt-4 text-gray-300">
        Have an account already?{" "}
        <Link to={"/login"} className="text-blue-600 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
