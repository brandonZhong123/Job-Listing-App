package com.example.joblisting.dto.listing;

import java.util.List;

public record UpdateListingDto(
        String title,
        String description,
        String location,
        List<String> tags,
        String company
) {
}
