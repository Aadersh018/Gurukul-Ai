import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import UserManagement from "../pages/Admin/UserManagement";
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import StudentDashboard from "../pages/Student/StudentDashboard";
import ParentDashboard from "../pages/Parent/ParentDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
      </Route>
      <Route path="/faculty" element={<FacultyDashboard/>} />
      <Route path="/student" element={<StudentDashboard/>} />
      <Route path="/parent" element={<ParentDashboard/>} />
    </Routes>
  );
};

export default AppRoutes;
