import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();
  console.log(user);

  return user?.roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user?.name ? (
    <Navigate to="/signup" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
