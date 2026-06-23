import { Link } from "react-router-dom";
import { GraduationCap, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-indigo-600 p-3 rounded-xl">
            <GraduationCap className="text-white" size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Gurukul AI
            </h1>
            <p className="text-slate-400 text-sm">
              AI Powered Educational Platform
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white text-center">
            Forgot Password
          </h2>

          <p className="text-slate-400 text-center mt-3 mb-8">
            Enter your registered email address and we'll send you a password reset link.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-slate-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded-xl py-3 text-white font-semibold"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-6">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 text-slate-400 hover:text-indigo-400 transition"
            >
              <ArrowLeft size={18} />
              Back to Login
            </Link>
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          If you no longer have access to your email,
          please contact your institution administrator.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;