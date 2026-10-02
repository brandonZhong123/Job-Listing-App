package com.example.joblisting.dto;

public record VerifyUserDto (
        String email,
        String verificationCode
) {

}
