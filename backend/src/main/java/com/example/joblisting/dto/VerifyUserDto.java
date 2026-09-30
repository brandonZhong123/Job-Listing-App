package com.example.joblisting.dto;

public record VerifyUserDto (
        String email,
        Long verificationCode
) {

}
