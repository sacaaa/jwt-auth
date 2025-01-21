package com.jwt.server.controller;

import com.jwt.server.model.dto.UserDto;
import com.jwt.server.repository.UserRepository;
import com.jwt.server.service.JwtService;
import com.jwt.server.service.UserService;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtService jwtService;

    private final UserService userService;

    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> request) {
        var email = request.get("email");
        var password = request.get("password");

        try {
            var user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (!userService.authenticate(email, password).getData()) {
                throw new UsernameNotFoundException("Invalid password");
            }

            return ResponseEntity.ok(Map.of(
                    "accessToken", jwtService.generateToken(user),
                    "refreshToken", jwtService.generateRefreshToken(user)
            ));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "An unexpected error occurred"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody UserDto userDto) {
        try {
            if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email is already in use"));
            }

            userService.register(userDto);
            return ResponseEntity.ok(Map.of("message", "User registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "An unexpected error occurred"));
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<Map<String, String>> refreshToken(@RequestBody Map<String, String> request) {
        var refreshToken = request.get("refreshToken");

        try {
            var email = jwtService.extractEmail(refreshToken);
            var user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (!jwtService.isTokenValid(refreshToken, user)) {
                throw new JwtException("Invalid refresh token");
            }

            return ResponseEntity.ok(Map.of(
                    "accessToken", jwtService.generateToken(user)
            ));
        } catch (UsernameNotFoundException | JwtException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "An unexpected error occurred"));
        }
    }

}
