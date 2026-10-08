package com.example.joblisting.dto.listing;

import java.util.List;

public record PostListingDto(
        String title,
        String description,
        String location,
        List<String>     tags,
        String company

) {
}
