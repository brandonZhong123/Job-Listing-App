import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./authentication/Login";
import Register from "./authentication/Register"
import Verify from "./authentication/Verify";
import Listings from "./pages/Listing";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Default page */}
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* Public pages */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/verify"
                    element={<Verify />}
                />

                {/* Protected page */}
                <Route
                    path="/listings"
                    element={
                        <ProtectedRoute>
                            <Listings />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;