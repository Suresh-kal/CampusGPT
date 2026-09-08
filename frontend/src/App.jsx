import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";

// Student Pages
import StudentDashboard from "./pages/StudentDashboard";
import Chat from "./pages/Chat";
import Documents from "./pages/Documents";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Teacher Pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

import TeacherDocuments from "./pages/teacher/TeacherDocuments";

import TeacherNotifications from "./pages/teacher/TeacherNotifications";

import TeacherProfile from "./pages/teacher/TeacherProfile";

import TeacherSettings from "./pages/teacher/TeacherSettings";

import TeacherChangePassword from "./pages/teacher/TeacherChangePassword";

import TeacherChat from "./pages/teacher/TeacherChat";

function App() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* =====================================================
          AUTHENTICATION
      ===================================================== */}

      <Route path="/login" element={<Login />} />

      <Route path="/change-password" element={<ChangePassword />} />

      {/* =====================================================
          STUDENT DASHBOARD
      ===================================================== */}

      <Route path="/student" element={<StudentDashboard />} />

      {/* Student Pages */}

      <Route path="/chat" element={<Chat />} />

      <Route path="/documents" element={<Documents />} />

      <Route path="/teacher/chat" element={<TeacherChat />} />

      <Route path="/notifications" element={<Notifications />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/settings" element={<Settings />} />

      {/* =====================================================
          TEACHER DASHBOARD
      ===================================================== */}

      <Route path="/teacher" element={<TeacherDashboard />} />

      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

      <Route path="/teacher/documents" element={<TeacherDocuments />} />

      <Route path="/teacher/notifications" element={<TeacherNotifications />} />

      <Route path="/teacher/profile" element={<TeacherProfile />} />

      <Route path="/teacher/settings" element={<TeacherSettings />} />

      <Route
        path="/teacher/change-password"
        element={<TeacherChangePassword />}
      />

      

      {/* =====================================================
          ADMIN DASHBOARD
      ===================================================== */}

      <Route path="/admin" element={<div>Admin Dashboard</div>} />

      {/* =====================================================
          UNKNOWN ROUTES
      ===================================================== */}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
