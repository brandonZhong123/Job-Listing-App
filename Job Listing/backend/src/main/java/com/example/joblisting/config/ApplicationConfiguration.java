
package com.example.joblisting.config;

import com.example.joblisting.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Configures the components Spring Security uses to authenticate users.
 *
 * This class defines how Spring Security:
 * - Finds users in the database
 * - Verifies user passwords
 * - Handles authentication requests
 * - Connects the user lookup and password verification together
 */
@Configuration
public class ApplicationConfiguration {

    private final UserRepository userRepository;

    public ApplicationConfiguration(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Tells Spring Security how to find a user when it needs to authenticate them.
     * In this application, the username provided by Spring Security is the user's email.
     */
    @Bean
    UserDetailsService userDetailsService() {
        return identifier -> userRepository.findByEmail(identifier)
                .or(() -> userRepository.findByUsername(identifier))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    /**
     * Creates the password encoder that Spring Security uses to hash and verify passwords.
     */
    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Creates the AuthenticationManager that handles authentication requests.
     */
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Connects the UserDetailsService and PasswordEncoder to the authentication process.
     *
     * The AuthenticationProvider uses the UserDetailsService to find the user
     * and the PasswordEncoder to verify their password.
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

}