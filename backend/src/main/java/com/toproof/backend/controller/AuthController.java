package com.toproof.backend.controller;

import com.toproof.backend.models.User;
import com.toproof.backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userRepo.existsById(user.getEmail())) {
            return "Email already registered!";
        }
        userRepo.save(user);
        return "Registration successful!";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User found = userRepo.findByEmail(user.getEmail());
        if (found != null && found.getPassword().equals(user.getPassword())) {
            return "Login successful!";
        }
        return "Invalid credentials!";
    }
}