import { useEffect, useState } from "react";

function Listings() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/listing", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setListings(data);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-4xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-bold mb-8">
                    Job Listings
                </h1>

                <div className="flex flex-col gap-4">

                    {listings.map((listing) => (
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