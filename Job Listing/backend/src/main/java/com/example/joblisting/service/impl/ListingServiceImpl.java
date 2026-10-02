package com.example.joblisting.service.impl;

import com.example.joblisting.dto.listing.GetListingDto;
import com.example.joblisting.dto.listing.PostListingDto;
import com.example.joblisting.mapper.ListingMapper;
import com.example.joblisting.model.Listing;
import com.example.joblisting.model.User;
import com.example.joblisting.repository.ListingRepository;
import com.example.joblisting.repository.UserRepository;
import com.example.joblisting.service.ListingService;
import org.springframework.data.domain.Sort;
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
    public Listing createListing(PostListingDto dto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Listing listing = listingMapper.fromPostDto(dto, user);
        listingRepository.save(listing);
        return listing;
    }

    @Override
    public List<Listing> listListings() {
        return listingRepository.findAllByOrderByCreatedAsc();
    }
}
