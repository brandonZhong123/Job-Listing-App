package com.example.joblisting.repository;

import com.example.joblisting.model.Listing;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ListingRepository extends CrudRepository<Listing, Long> {
    List<Listing> findAllByOrderByCreatedAsc();
    List<Listing> findAllByUserId(Long userId);
}
