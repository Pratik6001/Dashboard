import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLogin from "./pages/DashboardLogin/DashboardLogin";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import Assignments from "./pages/Assignments/Assignments";
import Purchases from "./pages/Purchases/Purchases";
import Transfers from "./pages/Transfer/Transfers";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard-login" element={<DashboardLogin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Role-based layout protection */}
        <Route path="/" element={<DashboardLayout />}>
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["admin", "base_commander"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="assignments"
            element={
              <ProtectedRoute allowedRoles={["admin", "base_commander"]}>
                <Assignments />
              </ProtectedRoute>
            }
          />
          <Route
            path="purchases"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "logistics_officer", "base_commander"]}
              >
                <Purchases />
              </ProtectedRoute>
            }
          />
          <Route
            path="transfers"
            element={
              <ProtectedRoute
                allowedRoles={["admin", "logistics_officer", "base_commander"]}
              >
                <Transfers />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
