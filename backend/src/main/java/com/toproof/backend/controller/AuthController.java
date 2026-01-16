package com.toproof.backend.controller;

import com.toproof.backend.dto.LoginDTO;
import com.toproof.backend.dto.RegisterDTO;
import com.toproof.backend.exception.InvalidCredentialsException;
import com.toproof.backend.models.User;
import com.toproof.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO registerDTO) {
        User user = new User();
        user.setEmail(registerDTO.getEmail());
        user.setPassword(registerDTO.getPassword());
        user.setFirstName(registerDTO.getFirstName());
        user.setLastName(registerDTO.getLastName());
        user.setPhone(registerDTO.getPhone());
        user.setAddress(registerDTO.getAddress());
        
        User registeredUser = userService.registerUser(user);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Registration successful!");
        response.put("user", registeredUser);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO) {
        if (!userService.authenticateUser(loginDTO.getEmail(), loginDTO.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }
        
        User user = userService.getUserByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("User not found"));
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful!");
        response.put("user", user);
        return ResponseEntity.ok(response);
    }
}