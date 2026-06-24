import { useEffect, useState } from "react";
import { BookOpen, Plus, Search } from "lucide-react";
import api from "../../services/api";

const SubjectManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    classId: "",
    faculty: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [facultyUsers, setFacultyUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchSubjects = async () => {
    try {
      const response = await api.get("/subjects");
      setSubjects(response.data.subjects);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await api.get("/classes");
      setClasses(response.data.classes);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFaculty = async () => {
    try {
      const response = await api.get("/admin/users");

      const faculty = response.data.users.filter(
        (user) => user.role === "faculty"
      );

      setFacultyUsers(faculty);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchClasses();
    fetchFaculty();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.classId ||
      !formData.faculty
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await api.post(
        "/subjects/create",
        formData
      );

      alert(response.data.message);

      setFormData({
        name: "",
        classId: "",
        faculty: "",
      });

      fetchSubjects();
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      subject?.classId?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <BookOpen size={34} className="text-indigo-500" />

        <div>
          <h1 className="text-3xl font-bold text-white">
            Subject Management
          </h1>

          <p className="text-slate-400">
            Create and assign subjects to classes
            and faculty.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Create Subject */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Plus
                size={22}
                className="text-indigo-500"
              />

              <h2 className="text-xl font-semibold text-white">
                Create Subject
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
                placeholder="Subject Name"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
              />

              <select
                name="classId"
                value={formData.classId}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
              >
                <option value="">
                  Select Class
                </option>

                {classes.map((cls) => (
                  <option
                    key={cls._id}
                    value={cls._id}
                  >
                    {cls.name} - {cls.section}
                  </option>
                ))}
              </select>

              <select
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
              >
                <option value="">
                  Select Faculty
                </option>

                {facultyUsers.map((faculty) => (
                  <option
                    key={faculty._id}
                    value={faculty._id}
                  >
                    {faculty.name}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-xl py-3 text-white font-semibold transition"
              >
                Create Subject
              </button>
            </form>
          </div>
        </div>

        {/* Subject List */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold text-white">
                All Subjects
              </h2>

              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search subjects..."
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
                      Subject
                    </th>

                    <th className="text-left py-4 text-slate-400">
                      Class
                    </th>

                    <th className="text-left py-4 text-slate-400">
                      Faculty
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSubjects.map((subject) => (
                    <tr
                      key={subject._id}
                      className="border-b border-slate-800 hover:bg-slate-800/40"
                    >
                      <td className="py-4 text-white">
                        {subject.name}
                      </td>

                      <td className="py-4 text-slate-300">
                        {subject.classId?.name} -{" "}
                        {subject.classId?.section}
                      </td>

                      <td className="py-4 text-slate-300">
                        {subject.faculty?.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredSubjects.length === 0 && (
                <div className="text-center text-slate-400 py-10">
                  No subjects found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectManagement;