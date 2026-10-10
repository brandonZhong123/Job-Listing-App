package com.example.joblisting.service;

import com.example.joblisting.dto.listing.GetListingDto;
import com.example.joblisting.dto.listing.PostListingDto;
import com.example.joblisting.dto.listing.UpdateListingDto;
import com.example.joblisting.model.Listing;
import com.example.joblisting.model.User;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ListingService {

    Listing createListing(PostListingDto dto, String email);

    List<Listing> listListings();

    List<Listing> getUserListings(String email);

    Listing singleListing(Long id);

    Listing updateListing(Long id, UpdateListingDto dto);

    void deleteListing(Long id);


}
