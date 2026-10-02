package com.example.joblisting.controller;

import com.example.joblisting.dto.user.LoginUserDto;
import com.example.joblisting.dto.user.RegisterUserDto;
import com.example.joblisting.dto.user.VerifyUserDto;
import com.example.joblisting.model.User;
import com.example.joblisting.response.LoginResponse;
import com.example.joblisting.service.AuthenticationService;
import com.example.joblisting.service.JWTService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/auth")
@Controller
public class AuthenticationController {


    private final JWTService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JWTService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto dto) {
        User registerUser = authenticationService.signup(dto);
        return ResponseEntity.ok(registerUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto dto) {
          User authenticatedUser = authenticationService.authenticate(dto);
          String jwtToken = jwtService.generateToken(authenticatedUser);
          LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getJwtExpiration());
          return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto dto) {
        try {
            authenticationService.verifyUser(dto);
            return ResponseEntity.ok("Account verified successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> verifyUser(@RequestBody String email) {
        try {
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
