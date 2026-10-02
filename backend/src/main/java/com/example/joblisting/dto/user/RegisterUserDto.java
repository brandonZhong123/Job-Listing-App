package com.example.joblisting.dto.user;

public record RegisterUserDto (
        String username,
        String email,
        String password
) {
}
