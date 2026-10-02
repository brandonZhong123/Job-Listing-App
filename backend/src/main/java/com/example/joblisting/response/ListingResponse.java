package com.example.joblisting.response;

import java.util.List;

public record ListingResponse(
        Long id,
        String title,
        String description,
        String location,
        List<String> tags,
        String company
) {
}
