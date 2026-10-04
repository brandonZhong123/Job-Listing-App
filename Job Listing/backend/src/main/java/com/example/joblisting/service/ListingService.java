package com.example.joblisting.service;

import com.example.joblisting.dto.listing.GetListingDto;
import com.example.joblisting.dto.listing.PostListingDto;
import com.example.joblisting.model.Listing;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ListingService {

    Listing createListing(PostListingDto dto, String email);

    List<Listing> listListings();

    Listing singleListing(Long id);
}
