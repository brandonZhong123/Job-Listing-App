import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                console.log("STATUS:", response.status);
                console.log("BODY:", await response.text());

                setError("Invalid email or password");
                return;
            }

            const data = await response.json();

            // Save JWT
            localStorage.setItem("token", data.token);

            setError("");
            navigate("/listings")
        } catch (error) {
            setError("Could not connect to server");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-80 flex flex-col gap-4"
            >
                <h1 className="text-3xl font-bold">Login</h1>

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
                    className="bg-blue-600 text-white p-2 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;