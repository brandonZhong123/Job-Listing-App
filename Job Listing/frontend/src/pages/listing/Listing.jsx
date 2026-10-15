import { apiFetch } from "../../helpers/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Listing() {
    const { listingId } = useParams();
    const [result, setResult] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        apiFetch(`http://localhost:8080/listing/${encodeURIComponent(listingId)}`, {
            signal: controller.signal
        })
            .then(response => {
                if (response.status === 404) throw new Error("This listing could not be found.");
                if (!response.ok) throw new Error("Could not load this listing. Please try again later.");
                return response.json();
            })
            .then(listing => {
                if (!controller.signal.aborted) setResult({ id: listingId, listing });
            })
            .catch(error => {
                if (!controller.signal.aborted) setResult({ id: listingId, error: error.message });
            });

        return () => controller.abort();
    }, [listingId]);

    const loading = result?.id !== listingId;
    const listing = !loading && result.listing;

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gray-50">
            <main className="max-w-4xl mx-auto px-6 py-10">
                <Link to="/listings" className="inline-block text-blue-600 hover:underline mb-6">
                    &larr; Back to listings
                </Link>

                <div aria-live="polite" aria-busy={loading}>
                    {loading && <p className="text-gray-600">Loading listing...</p>}
                    {!loading && result.error && (
                        <p role="alert" className="text-red-600">{result.error}</p>
                    )}
                    {listing && (
                        <article className="bg-white border rounded-xl p-6 sm:p-8 break-words">
                            <header className="border-b border-gray-200 pb-6 mb-6">
                                <h1 className="text-3xl font-bold">{listing.title}</h1>
                                <p className="text-lg text-gray-600 mt-2">{listing.company}</p>
                                <p className="text-sm text-gray-500 mt-2">{listing.location}</p>
                                {listing.tags?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {listing.tags.map(tag => (
                                            <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </header>
                            <h2 className="text-xl font-semibold mb-3">Job description</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{listing.description}</p>
                        </article>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Listing;

