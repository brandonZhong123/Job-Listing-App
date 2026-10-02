package com.example.joblisting.dto.user;

public record VerifyUserDto (
        String email,
        String verificationCode
) {

}
