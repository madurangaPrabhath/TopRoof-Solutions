package com.toproof.backend.service;

import com.toproof.backend.models.User;
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

    // Encode password before saving
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
}
