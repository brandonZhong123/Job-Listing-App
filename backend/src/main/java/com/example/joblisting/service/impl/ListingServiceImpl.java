package com.example.joblisting.service.impl;

import com.example.joblisting.dto.listing.PostListingDto;
import com.example.joblisting.dto.listing.UpdateListingDto;
import com.example.joblisting.mapper.ListingMapper;
import com.example.joblisting.model.Listing;
import com.example.joblisting.model.User;
import com.example.joblisting.repository.ListingRepository;
import com.example.joblisting.repository.UserRepository;
import com.example.joblisting.service.ListingService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListingServiceImpl implements ListingService {

    private final ListingRepository listingRepository;
    private final UserRepository userRepository;
    private final ListingMapper listingMapper;

    public ListingServiceImpl(ListingRepository listingRepository, UserRepository userRepository, ListingMapper listingMapper) {
        this.listingRepository = listingRepository;
        this.userRepository = userRepository;
        this.listingMapper = listingMapper;
    }


    @Override
    public Listing createListing(PostListingDto dto, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Listing listing = listingMapper.fromPostDto(dto, user);
        listingRepository.save(listing);
        return listing;
    }

    @Override
    public List<Listing> listListings() {
        return listingRepository.findAllByOrderByCreatedAsc();
    }


    @Override
    public Listing singleListing(Long id) {
        return listingRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }


    @Override
    public Listing updateListing(Long id, UpdateListingDto dto) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
        listing.setCompany(dto.company());
        listing.setTags(dto.tags());
        listing.setTitle(dto.title());
        listing.setDescription(dto.title());
        listing.setLocation(dto.location());
        return listingRepository.save(listing);
    }

    @Override
    public void deleteListing(Long id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
        listingRepository.delete(listing);
    }

}
