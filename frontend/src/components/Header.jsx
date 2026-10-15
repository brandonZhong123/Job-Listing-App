import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const linkClass = ({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`;

    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <Link to="/listings" className="text-xl font-bold text-blue-600">Job Listing</Link>
                <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1">
                    <NavLink to="/listings" end className={linkClass}>Listings</NavLink>
                    <NavLink to="/listings/personal" className={linkClass}>My Listings</NavLink>
                    <NavLink to="/listings/post" className={linkClass}>Post Listing</NavLink>
                    <button type="button" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100" onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login", { replace: true });
                    }}>Logout</button>
                </nav>
            </div>
        </header>
    );
}
