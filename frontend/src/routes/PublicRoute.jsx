import { Navigate } from "react-router-dom";
import { isTokenValid } from "../helpers/auth.js";

function PublicRoute({ children }) {
    if (isTokenValid()) {
        return <Navigate to="/listings" replace />;
    }

    return children;
}

export default PublicRoute;