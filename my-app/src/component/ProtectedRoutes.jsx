import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export const AdminRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user?.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const RoleRoute = ({ children, requiredRoles = [] }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user?.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!requiredRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
