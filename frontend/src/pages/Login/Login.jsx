import { GraduationCap, Brain, FileText, Bell, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-600 p-3 rounded-xl">
              <GraduationCap className="text-white" size={32} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">Gurukul AI</h1>
              <p className="text-slate-400">AI Powered Educational Platform</p>
            </div>
          </div>

          <h2 className="text-5xl font-bold text-white leading-tight mb-6">
            Transforming Education with Artificial Intelligence
          </h2>

          <p className="text-slate-300 text-lg max-w-lg">
            Automate grading, generate personalized feedback, create smart
            quizzes, and empower teachers to focus on what matters
            most—teaching.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FeatureCard icon={<Brain size={24} />} title="AI Feedback" />
          <FeatureCard
            icon={<FileText size={24} />}
            title="Smart Assessments"
          />
          <FeatureCard icon={<BarChart3 size={24} />} title="Analytics" />
          <FeatureCard icon={<Bell size={24} />} title="Real-Time Alerts" />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>

              <p className="text-slate-400 mt-2">
                Sign in to continue to Gurukul AI
              </p>
            </div>

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

              <div>
                <label className="block text-slate-300 mb-2">Password</label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 rounded-xl py-3 text-white font-semibold"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 border-t border-slate-800 pt-6">
              <p className="text-center text-sm text-slate-500">
                Accounts are created and managed by the institution
                administrator.
              </p>

              <p className="text-center text-sm text-slate-500 mt-1">
                Contact your administrator if you need access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      <div className="text-indigo-400 mb-2">{icon}</div>

      <h3 className="text-white font-medium">{title}</h3>
    </div>
  );
};

export default Login;
