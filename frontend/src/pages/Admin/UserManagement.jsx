import { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  RefreshCw,
} from "lucide-react";

const UserManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    password: "",
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      role: "student",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      role: "faculty",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const generatePassword = () => {
    const password = Math.random()
      .toString(36)
      .slice(-10);

    setFormData((prev) => ({
      ...prev,
      password,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill all fields");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: "Active",
    };

    setUsers((prev) => [newUser, ...prev]);

    console.log("User Created:", formData);

    setFormData({
      name: "",
      email: "",
      role: "student",
      password: "",
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Users size={34} className="text-indigo-500" />

          <div>
            <h1 className="text-3xl font-bold text-white">
              User Management
            </h1>

            <p className="text-slate-400">
              Create and manage students,
              faculty, and parents.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Create User */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

              <div className="flex items-center gap-2 mb-6">
                <UserPlus
                  size={22}
                  className="text-indigo-500"
                />

                <h2 className="text-xl font-semibold text-white">
                  Create User
                </h2>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                />

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                >
                  <option value="student">
                    Student
                  </option>

                  <option value="faculty">
                    Faculty
                  </option>

                  <option value="parent">
                    Parent
                  </option>
                </select>

                <div>
                  <label className="block text-slate-300 mb-2">
                    Temporary Password
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.password}
                      readOnly
                      placeholder="Generate password"
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
                    />

                    <button
                      type="button"
                      onClick={generatePassword}
                      className="bg-slate-700 hover:bg-slate-600 px-4 rounded-xl text-white"
                    >
                      <RefreshCw size={18} />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-xl py-3 text-white font-semibold transition"
                >
                  Create User
                </button>
              </form>
            </div>
          </div>

          {/* User List */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <h2 className="text-xl font-semibold text-white">
                  All Users
                </h2>

                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-white outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">

                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-4 text-slate-400">
                        Name
                      </th>

                      <th className="text-left py-4 text-slate-400">
                        Email
                      </th>

                      <th className="text-left py-4 text-slate-400">
                        Role
                      </th>

                      <th className="text-left py-4 text-slate-400">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-slate-800 hover:bg-slate-800/40"
                      >
                        <td className="py-4 text-white">
                          {user.name}
                        </td>

                        <td className="py-4 text-slate-300">
                          {user.email}
                        </td>

                        <td className="py-4 capitalize">
                          <span className="text-indigo-400">
                            {user.role}
                          </span>
                        </td>

                        <td className="py-4">
                          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserManagement;