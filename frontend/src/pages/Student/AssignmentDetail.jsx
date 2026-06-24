import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const AssignmentDetail = () => {
  const { id } = useParams();

  const [assignment, setAssignment] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  // fetch assignment
  const fetchAssignment = async () => {
    try {
      const res = await api.get(`/assignments`);
      const found = res.data.assignments.find(
        (a) => a._id === id
      );
      setAssignment(found);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div className="text-white max-w-3xl mx-auto">
      {assignment && (
        <>
          <h1 className="text-2xl font-bold mb-2">
            {assignment.title}
          </h1>

          <p className="text-slate-400 mb-6">
            {assignment.description}
          </p>
        </>
      )}

      {/* Answer Box */}
      <textarea
        className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl"
        rows="8"
        placeholder="Write your answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button
        onClick={async () => {
          try {
            const res = await api.post("/submissions", {
              assignmentId: id,
              answerText: answer,
            });

            setResult(res.data.submission);
          } catch (err) {
            console.log(err);
          }
        }}
        className="mt-4 px-6 py-3 bg-indigo-600 rounded-lg"
      >
        Submit Answer
      </button>

      {/* AI Result */}
      {result && (
        <div className="mt-6 p-4 bg-slate-900 border border-slate-700 rounded-xl">
          <h2 className="text-lg font-semibold">
            AI Feedback
          </h2>

          <p className="text-slate-300 mt-2 whitespace-pre-line">
            {result.aiFeedback}
          </p>

          <p className="mt-2 text-green-400">
            Marks: {result.aiMarks}/10
          </p>
        </div>
      )}
    </div>
  );
};

export default AssignmentDetail;