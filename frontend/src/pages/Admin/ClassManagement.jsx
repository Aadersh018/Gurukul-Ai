import { useEffect, useState } from "react";
import { School, Plus, Search } from "lucide-react";
import api from "../../services/api";

const ClassManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    section: "",
  });

  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchClasses = async () => {
    try {
      setLoading(true);

      const response = await api.get("/classes");

      setClasses(response.data.classes);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch classes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.section) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await api.post(
        "/classes/create",
        formData
      );

      alert(response.data.message);

      setFormData({
        name: "",
        section: "",
      });

      await fetchClasses();
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const filteredClasses = classes.filter(
    (classItem) =>
      classItem?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      classItem?.section
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <School
            size={34}
            className="text-indigo-500"
          />

          <div>
            <h1 className="text-3xl font-bold text-white">
              Class Management
            </h1>

            <p className="text-slate-400">
              Create and manage classes.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Create Class */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Plus
                  size={22}
                  className="text-indigo-500"
                />

                <h2 className="text-xl font-semibold text-white">
                  Create Class
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
                  placeholder="Class Name"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                />

                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  placeholder="Section (A, B, C...)"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                />

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-xl py-3 text-white font-semibold transition"
                >
                  Create Class
                </button>
              </form>
            </div>
          </div>

          {/* Classes List */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold text-white">
                  All Classes
                </h2>

                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Search classes..."
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
                        Class Name
                      </th>

                      <th className="text-left py-4 text-slate-400">
                        Section
                      </th>

                      <th className="text-left py-4 text-slate-400">
                        Class Teacher
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan="3"
                          className="py-8 text-center text-slate-400"
                        >
                          Loading classes...
                        </td>
                      </tr>
                    ) : filteredClasses.length === 0 ? (
                      <tr>
                        <td
                          colSpan="3"
                          className="py-8 text-center text-slate-400"
                        >
                          No classes found
                        </td>
                      </tr>
                    ) : (
                      filteredClasses.map((classItem) => (
                        <tr
                          key={classItem._id}
                          className="border-b border-slate-800 hover:bg-slate-800/40"
                        >
                          <td className="py-4 text-white">
                            {classItem.name}
                          </td>

                          <td className="py-4 text-slate-300">
                            {classItem.section}
                          </td>

                          <td className="py-4 text-slate-300">
                            {classItem.classTeacher
                              ? classItem.classTeacher.name
                              : "Not Assigned"}
                          </td>
                        </tr>
                      ))
                    )}
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

export default ClassManagement;