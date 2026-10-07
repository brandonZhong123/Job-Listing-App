import { useEffect, useState } from "react";

function PostListing() {
    const [setTitle, title] = useState("");
    const [setDescription, description] = useState("");
    const [setLocation, location] = useState("");
    const [setTags, tags] = useState([]);
    const [setCompany, company] = useState("");
    const [setError, error] = useState("");

    try {
        const response = await fetch("http://localhost:8080/listing/post", {
            
        });
    } catch (error){

    }
}

export default PostListing