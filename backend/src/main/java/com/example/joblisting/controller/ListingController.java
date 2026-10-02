package com.example.joblisting.controller;

import com.example.joblisting.dto.listing.PostListingDto;
import com.example.joblisting.mapper.ListingMapper;
import com.example.joblisting.model.Listing;
import com.example.joblisting.model.User;
import com.example.joblisting.response.ListingResponse;
import com.example.joblisting.service.ListingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import jakarta.validation.Valid;

@Controller
@RequestMapping("/listing")
public class ListingController {

    private final ListingService listingService;
    private final ListingMapper listingMapper;

    public ListingController(ListingService listingService, ListingMapper listingMapper) {
        this.listingService = listingService;
        this.listingMapper = listingMapper;
    }

    @PostMapping("/post")
    public ResponseEntity<ListingResponse> createListing(@Valid @RequestBody PostListingDto dto, Authentication authentication) {
        Listing listing = listingService.createListing(dto, authentication.getName());
        ListingResponse res = listingMapper.fromListing(listing);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

}
