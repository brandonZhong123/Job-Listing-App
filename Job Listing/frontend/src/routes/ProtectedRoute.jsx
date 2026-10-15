import { Navigate } from "react-router-dom";
import { isTokenValid } from "../helpers/auth.js";
import Header from "../components/Header";

function ProtectedRoute({ children }) {
    const hadToken = Boolean(localStorage.getItem("token"));
    if (!isTokenValid()) {
        return <Navigate to={hadToken ? "/login?expired=1" : "/login"} replace />;
    }

    return <><Header />{children}</>;
}

export default ProtectedRoute;
