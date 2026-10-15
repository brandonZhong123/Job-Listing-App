import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [params] = useSearchParams();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!response.ok) {
                setError("Invalid email or password");
                return;
            }

            const data = await response.json();

            // Save JWT
            localStorage.setItem("token", data.token);

            setError("");
            navigate("/listings")
        } catch {
            setError("Could not connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-80 flex flex-col gap-4"
            >
                <h1 className="text-3xl font-bold">Login</h1>
                {params.has("expired") && <p role="status" className="text-gray-600">Your session has expired. Please log in again.</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded"
                />

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white p-2 rounded"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <Link to="/register" className="text-blue-600 hover:underline">Create an account</Link>
            </form>
        </div>
    );
}

export default Login;
