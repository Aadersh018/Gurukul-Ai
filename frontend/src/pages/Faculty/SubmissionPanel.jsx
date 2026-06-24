import { useEffect, useState } from "react";
import api from "../../services/api";

const SubmissionPanel = () => {
  const [submissions, setSubmissions] = useState([]);

  const fetchSubmissions = async () => {
    try {
      const res = await api.get("/submissions");
      setSubmissions(res.data.submissions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-6">
        Faculty Submission Panel
      </h1>

      <div className="grid gap-4">
        {submissions.map((s) => (
          <div
            key={s._id}
            className="bg-slate-900 border border-slate-800 p-4 rounded-xl"
          >
            <h2 className="text-lg font-semibold">
              {s.assignmentId?.title}
            </h2>

            <p className="text-slate-400 mt-2">
              Student: {s.studentId?.name} ({s.studentId?.email})
            </p>

            <p className="mt-3 text-slate-300">
              Answer: {s.answerText}
            </p>

            <div className="mt-3 p-3 bg-slate-800 rounded-lg">
              <p className="text-green-400">
                AI Marks: {s.aiMarks}/10
              </p>

              <p className="text-slate-300 whitespace-pre-line">
                AI Feedback: {s.aiFeedback}
              </p>
            </div>

            <button className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg">
              Review / Override
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionPanel;