import { Link } from "react-router-dom";

const FacultyDashboard = () => {
  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-4">
        Faculty Dashboard
      </h1>

      <Link
        to="/faculty/submissions"
        className="text-indigo-400 hover:underline"
      >
        View Submissions
      </Link>
    </div>
  );
};

export default FacultyDashboard;