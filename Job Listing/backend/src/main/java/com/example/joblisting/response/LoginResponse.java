package com.example.joblisting.response;

public record LoginResponse(
        String token,
        Long expiresIn
) {
}
