package com.example.joblisting.dto;

public record RegisterUserDto (
        String username,
        String email,
        String password
) {
}
