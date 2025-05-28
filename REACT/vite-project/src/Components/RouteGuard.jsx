import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../auth/auth";

const ProtectedRoute = ({ role }) => {
  const userRole = getUserRole();
  return userRole === role ? <Outlet /> : <Navigate to="/unauthorized" />;
};
export default ProtectedRoute;