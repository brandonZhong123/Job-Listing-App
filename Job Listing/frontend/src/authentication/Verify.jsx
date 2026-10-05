import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Verify() {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/auth/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    verificationCode
                })
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                setError(errorMessage || "Verification failed");
                return;
            }

            navigate("/login");

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
                <h1 className="text-3xl font-bold">
                    Verify Account
                </h1>

                <p className="text-gray-600">
                    Enter the verification code sent to your email.
                </p>

                <input
                    type="text"
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="border p-2 rounded"
                    required
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
                    Verify
                </button>
            </form>
        </div>
    );
}

export default Verify;