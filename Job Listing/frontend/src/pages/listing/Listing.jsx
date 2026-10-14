import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Listings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [keyword, setKeyword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const controller = new AbortController();

        fetch(`http://localhost:8080/listing?search=${encodeURIComponent(keyword)}`, {
            signal: controller.signal,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) throw new Error("Could not load listings. Please try again.");
                return response.json();
            })
            .then(data => {
                setListings(data);
            })
            .catch(error => {
                if (!controller.signal.aborted) setError(error.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });
        return () => controller.abort();
    }, [keyword]);

    const handleSearch = (event) => {
        event.preventDefault();
        if (search.trim() === keyword) return;
        setLoading(true);
        setError("");
        setKeyword(search.trim());
    };
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-4xl mx-auto px-6 py-10">

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">
                        Job Listings
                    </h1>

                    <Link
                        to="/listings/post"
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        + Post Listing
                    </Link>
                </div>


                <form onSubmit={handleSearch} role="search" className="flex gap-2 mb-8">
                    <input
                        type="search"
                        aria-label="Search jobs by title or company"
                        placeholder="Search by job title or company"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="min-w-0 flex-1 bg-white border rounded-lg px-4 py-2"
                    />
                    <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                        Search
                    </button>
                </form>

                <div className="flex flex-col gap-4" aria-live="polite" aria-busy={loading}>
                    {loading && <p className="text-gray-600">Loading listings...</p>}
                    {error && <p role="alert" className="text-red-600">{error}</p>}
                    {!loading && !error && listings.length === 0 && (
                        <p className="text-gray-600">{keyword ? "No jobs match your search." : "No listings yet."}</p>
                    )}

                    {!loading && !error && listings.map((listing) => (
                        <div
                            key={listing.id}
                            className="bg-white border rounded-xl p-6 hover:shadow-md transition"
                        >
                            <h2 className="text-xl font-semibold">
                                {listing.title}
                            </h2>

                            <p className="text-gray-600 mt-1">
                                {listing.company}
                            </p>

                            <p className="text-sm text-gray-500 mt-2">
                                {listing.location}
                            </p>

                            <p className="text-gray-600 mt-4">
                                {listing.description}
                            </p>

                            <div className="flex gap-2 mt-4">
                                {listing.tags?.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </main>
        </div>
    );
}

export default Listings;
