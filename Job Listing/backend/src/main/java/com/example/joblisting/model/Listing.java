package com.example.joblisting.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Listing {

    @Column(name = "id", nullable = false, unique = true)
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false, length = 1000)
    private String description;

    @Column(name = "location", nullable = false)
    private String location;

    @ElementCollection
    private List<String> tags;

    @Column(name = "company", nullable = false)
    private String company;

    @ManyToOne(optional=false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, updatable = false)
    private LocalDateTime created;

    public Listing(
            String title,
            String description,
            String location,
            List<String> tags,
            String company,
            LocalDateTime created,
            User user) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.tags = tags;
        this.company = company;
        this.user = user;
        this.created = created;
    }

    public Listing() {

    }

    public Listing(String title, String description, String location, List<String> tags, String company, User user) {
    }
}
