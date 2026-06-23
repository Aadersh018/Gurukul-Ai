import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <div className="h-20 border-b border-slate-800 bg-slate-900 px-8 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Welcome Admin 👋
        </h2>

        <p className="text-slate-400">
          Manage your institution efficiently.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="text-slate-300" />

          <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>

        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </div>
  );
};

export default Navbar;