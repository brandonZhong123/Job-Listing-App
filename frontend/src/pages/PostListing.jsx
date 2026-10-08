import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostListing() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const [company, setCompany] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:8080/listing/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    location,
                    tags,
                    company
                })
            });

            if (!res.ok) {
                const errorMessage = await res.text();
                setError(errorMessage || "Posting failed");
                return;
            }

            navigate("/listings");

        } catch (err) {
            setError("Could not connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-96 bg-white border rounded-xl p-6 flex flex-col gap-4"
            >
                <h1 className="text-3xl font-bold">
                    Post Listing
                </h1>

                <input
                    type="text"
                    placeholder="Job title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <input
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <div className="border p-2 rounded">
                    <div className="flex flex-wrap gap-2 mb-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
                            >
                                {tag}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setTags(tags.filter((currentTag) => currentTag !== tag))
                                    }
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>

                    <input
                        type="text"
                        placeholder="Add a tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();

                                const newTag = tagInput.trim();

                                if (newTag && !tags.includes(newTag)) {
                                    setTags([...tags, newTag]);
                                }

                                setTagInput("");
                            }
                        }}
                        className="outline-none w-full"
                    />
                </div>

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
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
                    disabled={loading}
                    className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
                >
                    {loading ? "Posting..." : "Post Listing"}
                </button>
            </form>
        </div>
    );
}

export default PostListing;