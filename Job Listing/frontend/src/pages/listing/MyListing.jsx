import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyListings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editDraft, setEditDraft] = useState({
        title: "",
        description: "",
        location: "",
        company: "",
        tags: []
    });
    const [editTagInput, setEditTagInput] = useState("");
    const [savingId, setSavingId] = useState(null);

    const authHeaders = (customHeaders = {}) => {
        const token = localStorage.getItem("token");

        return {
            Authorization: "Bearer " + token,
            ...customHeaders
        };
    };

    useEffect(() => {
        fetch("http://localhost:8080/listing/personal", {
            headers: authHeaders()
        })
            .then((response) => response.json())
            .then((data) => {
                setListings(data);
            })
            .finally(() => setLoading(false));
    }, []);

    const startEdit = (listing) => {
        setOpenMenuId(null);
        setEditingId(listing.id);
        setEditDraft({
            title: listing.title,
            description: listing.description,
            location: listing.location,
            company: listing.company,
            tags: listing.tags ?? []
        });
        setEditTagInput("");
    };

    const handleDelete = async (listingId) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/listing/${listingId}`, {
                method: "DELETE",
                headers: authHeaders()
            });

            if (!response.ok) {
                throw new Error("Failed to delete listing.");
            }

            setListings((currentListings) =>
                currentListings.filter((listing) => listing.id !== listingId)
            );
            setOpenMenuId(null);
        } catch (error) {
            alert(error.message || "Could not delete this listing.");
        }
    };

    const handleEditSubmit = async (listingId) => {
        try {
            setSavingId(listingId);

            const response = await fetch(`http://localhost:8080/listing/${listingId}`, {
                method: "PUT",
                headers: authHeaders({ "Content-Type": "application/json" }),
                body: JSON.stringify(editDraft)
            });

            if (!response.ok) {
                throw new Error("Failed to update listing.");
            }

            setListings((currentListings) =>
                currentListings.map((listing) =>
                    listing.id === listingId
                        ? { ...listing, ...editDraft }
                        : listing
                )
            );
            setEditingId(null);
            setEditDraft({
                title: "",
                description: "",
                location: "",
                company: "",
                tags: []
            });
        } catch (error) {
            alert(error.message || "Could not update this listing.");
        } finally {
            setSavingId(null);
        }
    };

    const handleTagAdd = (event) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();
        const trimmedTag = editTagInput.trim();

        if (!trimmedTag || editDraft.tags.includes(trimmedTag)) {
            setEditTagInput("");
            return;
        }

        setEditDraft((currentDraft) => ({
            ...currentDraft,
            tags: [...currentDraft.tags, trimmedTag]
        }));
        setEditTagInput("");
    };

    const handleTagRemove = (tagToRemove) => {
        setEditDraft((currentDraft) => ({
            ...currentDraft,
            tags: currentDraft.tags.filter((tag) => tag !== tagToRemove)
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-4xl mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">
                        My Listings
                    </h1>

                    <Link
                        to="/listings/post"
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        + Post Listing
                    </Link>
                </div>

                <div className="flex flex-col gap-4">
                    {listings.map((listing) => (
                        <div
                            key={listing.id}
                            className="bg-white border rounded-xl p-6 hover:shadow-md transition"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
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

                                    <div className="flex flex-wrap gap-2 mt-4">
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

                                <div className="relative">
                                    <button
                                        type="button"
                                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-2xl text-gray-600"
                                        aria-label="Listing actions"
                                        onClick={() =>
                                            setOpenMenuId((currentId) =>
                                                currentId === listing.id ? null : listing.id
                                            )
                                        }
                                    >
                                        ⋮
                                    </button>

                                    {openMenuId === listing.id && (
                                        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                            <button
                                                type="button"
                                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                onClick={() => startEdit(listing)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                onClick={() => handleDelete(listing.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {editingId === listing.id && (
                                <div className="mt-5 border rounded-xl p-4 bg-gray-50">
                                    <div className="grid gap-3">
                                        <input
                                            type="text"
                                            value={editDraft.title}
                                            onChange={(event) =>
                                                setEditDraft((currentDraft) => ({
                                                    ...currentDraft,
                                                    title: event.target.value
                                                }))
                                            }
                                            className="border rounded p-2"
                                            placeholder="Job title"
                                        />

                                        <input
                                            type="text"
                                            value={editDraft.company}
                                            onChange={(event) =>
                                                setEditDraft((currentDraft) => ({
                                                    ...currentDraft,
                                                    company: event.target.value
                                                }))
                                            }
                                            className="border rounded p-2"
                                            placeholder="Company"
                                        />

                                        <input
                                            type="text"
                                            value={editDraft.location}
                                            onChange={(event) =>
                                                setEditDraft((currentDraft) => ({
                                                    ...currentDraft,
                                                    location: event.target.value
                                                }))
                                            }
                                            className="border rounded p-2"
                                            placeholder="Location"
                                        />

                                        <textarea
                                            value={editDraft.description}
                                            onChange={(event) =>
                                                setEditDraft((currentDraft) => ({
                                                    ...currentDraft,
                                                    description: event.target.value
                                                }))
                                            }
                                            className="border rounded p-2 min-h-28"
                                            placeholder="Description"
                                        />

                                        <div className="border rounded p-2">
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {editDraft.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
                                                    >
                                                        {tag}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleTagRemove(tag)}
                                                            className="text-sm leading-none"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>

                                            <input
                                                type="text"
                                                value={editTagInput}
                                                onChange={(event) => setEditTagInput(event.target.value)}
                                                onKeyDown={handleTagAdd}
                                                className="outline-none w-full"
                                                placeholder="Add tag and press Enter"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => setEditingId(null)}
                                            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleEditSubmit(listing.id)}
                                            disabled={savingId === listing.id}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                                        >
                                            {savingId === listing.id ? "Saving..." : "Save changes"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default MyListings;
