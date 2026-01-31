package com.toproof.backend.service;

import com.toproof.backend.models.User;
import com.toproof.backend.dto.UpdateProfileDTO;
import com.toproof.backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  public Optional<User> getUserById(Long id) {
    return userRepository.findById(id);
  }

  public Optional<User> getUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public User registerUser(User user) {
    if (userRepository.existsByEmail(user.getEmail())) {
      throw new RuntimeException("Email already exists");
    }

    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }

  public User updateUser(Long id, User updatedUser) {
    return userRepository.findById(id)
        .map(user -> {
          user.setFirstName(updatedUser.getFirstName());
          user.setLastName(updatedUser.getLastName());
          user.setPhone(updatedUser.getPhone());
          user.setAddress(updatedUser.getAddress());
          if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
          }
          return userRepository.save(user);
        })
        .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }

  public boolean authenticateUser(String email, String password) {
    Optional<User> user = userRepository.findByEmail(email);
    return user.isPresent() && passwordEncoder.matches(password, user.get().getPassword());
  }

  // Profile Management
  public User updateProfile(String email, UpdateProfileDTO updateDTO) {
    return userRepository.findByEmail(email)
        .map(user -> {
          // Update profile fields
          if (updateDTO.getFirstName() != null) {
            user.setFirstName(updateDTO.getFirstName());
          }
          if (updateDTO.getLastName() != null) {
            user.setLastName(updateDTO.getLastName());
          }
          if (updateDTO.getPhone() != null) {
            user.setPhone(updateDTO.getPhone());
          }
          if (updateDTO.getAddress() != null) {
            user.setAddress(updateDTO.getAddress());
          }
          
          // Handle password change if provided
          if (updateDTO.getPassword() != null && !updateDTO.getPassword().isEmpty()) {
            // Verify current password
            if (updateDTO.getCurrentPassword() == null || 
                !passwordEncoder.matches(updateDTO.getCurrentPassword(), user.getPassword())) {
              throw new RuntimeException("Current password is incorrect");
            }
            user.setPassword(passwordEncoder.encode(updateDTO.getPassword()));
          }
          
          return userRepository.save(user);
        })
        .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
  }

  public boolean deleteAccount(String email, String password) {
    Optional<User> userOpt = userRepository.findByEmail(email);
    if (userOpt.isPresent()) {
      User user = userOpt.get();
      
      // Prevent deleting admin accounts
      if ("ADMIN".equals(user.getRole())) {
        throw new RuntimeException("Cannot delete admin accounts");
      }
      
      // Verify password
      if (!passwordEncoder.matches(password, user.getPassword())) {
        return false;
      }
      
      userRepository.delete(user);
      return true;
    }
    throw new RuntimeException("User not found");
  }
}
