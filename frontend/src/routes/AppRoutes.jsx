import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import UserManagement from "../pages/Admin/UserManagement";
import ClassManagement from "../pages/Admin/ClassManagement";
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import StudentDashboard from "../pages/Student/StudentDashboard";
import ParentDashboard from "../pages/Parent/ParentDashboard";
import SubjectManagement from "../pages/Admin/SubjectManagement";
import AssignmentDetail from "../pages/Student/AssignmentDetail";
import SubmissionPanel from "../pages/Faculty/SubmissionPanel";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="classes" element={<ClassManagement />} />
        <Route path="subjects" element={<SubjectManagement />} />
      </Route>
      <Route path="/faculty" element={<FacultyDashboard />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/parent" element={<ParentDashboard />} />
      <Route path="/assignment/:id" element={<AssignmentDetail/>} />
      <Route
  path="/faculty/submissions"
  element={<SubmissionPanel />}
/>
    </Routes>
  );
};

export default AppRoutes;
