import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  const fetchAssignments = async () => {
    try {
      const res = await api.get("/assignments");
      console.log("API RESPONSE:", res.data);
      setAssignments(res.data.assignments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

        {assignments.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-slate-300">
            No assignments available yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {assignments.map((a) => (
              <div
                key={a._id}
                className="bg-slate-900 p-4 rounded-xl border border-slate-800"
              >
                <h2 className="text-lg font-semibold text-white">{a.title}</h2>

                <p className="text-slate-400 mt-1">{a.description}</p>

                <button
                  onClick={() => navigate(`/assignment/${a._id}`)}
                  className="mt-3 px-4 py-2 bg-indigo-600 rounded-lg"
                >
                  View / Submit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
