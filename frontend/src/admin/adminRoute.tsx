// src/admin/AdminRoute.tsx
import { Navigate } from "react-router-dom";
import { isAdmin } from "./auth/auth";

const AdminRoute = ({ children }: React.PropsWithChildren) => {
  return isAdmin() ? children : <Navigate to="/" />;
};

export default AdminRoute;
