import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                setError(errorMessage || "Could not create account");
                setMessage("");
                return;
            }

            await response.json();

            setError("");
            navigate("/verify", {
                state: {
                    email: email
                }
            });
        } catch (error) {
            setError("Could not connect to server");
            setMessage("");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-80 flex flex-col gap-4"
            >
                <h1 className="text-3xl font-bold">Register</h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                {message && (
                    <p className="text-green-600">
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;