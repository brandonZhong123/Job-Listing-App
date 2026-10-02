package com.example.joblisting.mapper;

import com.example.joblisting.dto.listing.PostListingDto;
import com.example.joblisting.model.Listing;
import com.example.joblisting.model.User;
import com.example.joblisting.response.ListingResponse;
import org.springframework.stereotype.Component;

@Component
public class ListingMapper {

    public Listing fromPostDto(PostListingDto dto, User user) {
        return new Listing(
                dto.title(),
                dto.description(),
                dto.location(),
                dto.tags(),
                dto.company(),
                user
        );
    }

    public ListingResponse fromListing(Listing listing) {
        return new ListingResponse(
                listing.getId(),
                listing.getTitle(),
                listing.getDescription(),
                listing.getLocation(),
                listing.getTags(),
                listing.getCompany()
        );
    }


}
