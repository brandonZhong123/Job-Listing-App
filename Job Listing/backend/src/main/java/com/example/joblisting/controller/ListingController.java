package com.example.joblisting.controller;

import com.example.joblisting.dto.listing.PostListingDto;
import com.example.joblisting.dto.listing.UpdateListingDto;
import com.example.joblisting.mapper.ListingMapper;
import com.example.joblisting.model.Listing;
import com.example.joblisting.model.User;
import com.example.joblisting.response.ListingResponse;
import com.example.joblisting.response.UpdateListingResponse;
import com.example.joblisting.service.ListingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

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
    public ResponseEntity<ListingResponse> createListing(@Valid @RequestBody PostListingDto dto, @AuthenticationPrincipal User user) {
        String email = user.getEmail();
        Listing listing = listingService.createListing(dto, email);
        ListingResponse res = listingMapper.fromListing(listing);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ListingResponse>> getListings() {
        List<Listing> lists = listingService.listListings();
        List<ListingResponse> listingResponses = lists.stream().map(listingMapper::fromListing).toList();
        return ResponseEntity.ok(listingResponses);
    }

    @GetMapping("/{listingId}")
    public ResponseEntity<ListingResponse> listing(@PathVariable Long listingId) {
        Listing listing = listingService.singleListing(listingId);
        ListingResponse listingResponse = listingMapper.fromListing(listing);
        return ResponseEntity.ok(listingResponse);
    }

    @PutMapping("/{listingId}")
    public ResponseEntity<UpdateListingResponse> updateListing(
            @PathVariable Long listingId,
            @RequestBody UpdateListingDto dto) {
        Listing listing = listingService.updateListing(listingId, dto);
        UpdateListingResponse res = listingMapper.fromListingToUpdateListingResponse(listing);
        return ResponseEntity.ok(res);
    }



}
