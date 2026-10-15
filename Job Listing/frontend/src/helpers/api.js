import { isTokenValid } from "./auth.js";

// All protected requests share the same expired-session handling.
export async function apiFetch(url, options = {}) {
    const expireSession = () => {
        localStorage.removeItem("token");
        window.location.replace("/login?expired=1");
        throw new Error("Your session has expired. Please log in again.");
    };

    if (!isTokenValid()) return expireSession();

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (response.status === 401 || !isTokenValid()) return expireSession();
    return response;
}
