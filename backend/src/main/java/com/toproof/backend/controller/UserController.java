package com.toproof.backend.controller;

import com.toproof.backend.models.User;
import com.toproof.backend.service.UserService;
import com.toproof.backend.dto.UpdateProfileDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
    return ResponseEntity.ok(userService.getAllUsers());
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    return userService.getUserById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/email/{email}")
  public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
    return userService.getUserByEmail(email)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
    try {
      return ResponseEntity.ok(userService.updateUser(id, user));
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/profile")
  public ResponseEntity<?> getProfile(@RequestParam String email) {
    return userService.getUserByEmail(email)
        .map(user -> {
          Map<String, Object> response = new HashMap<>();
          response.put("id", user.getId());
          response.put("email", user.getEmail());
          response.put("firstName", user.getFirstName());
          response.put("lastName", user.getLastName());
          response.put("fullName", user.getFullName());
          response.put("phone", user.getPhone());
          response.put("address", user.getAddress());
          response.put("role", user.getRole());
          return ResponseEntity.ok(response);
        })
        .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/profile")
  public ResponseEntity<?> updateProfile(@RequestParam String email, @RequestBody UpdateProfileDTO updateDTO) {
    try {
      User updatedUser = userService.updateProfile(email, updateDTO);
      Map<String, Object> response = new HashMap<>();
      response.put("id", updatedUser.getId());
      response.put("email", updatedUser.getEmail());
      response.put("firstName", updatedUser.getFirstName());
      response.put("lastName", updatedUser.getLastName());
      response.put("fullName", updatedUser.getFullName());
      response.put("phone", updatedUser.getPhone());
      response.put("address", updatedUser.getAddress());
      response.put("role", updatedUser.getRole());
      return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
      Map<String, String> error = new HashMap<>();
      error.put("error", e.getMessage());
      return ResponseEntity.badRequest().body(error);
    }
  }

  @DeleteMapping("/account")
  public ResponseEntity<?> deleteAccount(@RequestParam String email, @RequestParam String password) {
    try {
      boolean deleted = userService.deleteAccount(email, password);
      if (deleted) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Account deleted successfully");
        return ResponseEntity.ok(response);
      } else {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Invalid password");
        return ResponseEntity.badRequest().body(error);
      }
    } catch (RuntimeException e) {
      Map<String, String> error = new HashMap<>();
      error.put("error", e.getMessage());
      return ResponseEntity.badRequest().body(error);
    }
  }
}
