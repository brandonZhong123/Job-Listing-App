export function isTokenValid() {
    const token = localStorage.getItem("token");

    if (!token) {
        return false;
    }

    try {
        const base64Url = token.split(".")[1];

        const base64 = base64Url
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const payload = JSON.parse(atob(base64));

        if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            return false;
        }

        return true;
    } catch {
        localStorage.removeItem("token");
        return false;
    }
}