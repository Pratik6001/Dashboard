import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, loadingUser } = useUser();

  if (loadingUser) {
    return <div>Loading...</div>; // Or a loading spinner component
  }

  if (!user || !user.roles) {
    return <Navigate to="/dashboard-login" replace />;
  }

  if (!allowedRoles.includes(user.roles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
