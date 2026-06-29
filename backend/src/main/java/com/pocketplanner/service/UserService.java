package com.pocketplanner.service;

import com.pocketplanner.entity.User;
import com.pocketplanner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    public User loginUser(String email, String password) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    // Check if the account is active
    if (!user.isActive()) {
        throw new RuntimeException("This account has been deleted.");
    }

    // Verify password
    if (!passwordEncoder.matches(password, user.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    return user;
}
    public User getUserById(Long id) {
    return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
}

public User updateUser(Long id, User updatedUser) {

    User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

    user.setName(updatedUser.getName());
    user.setEmail(updatedUser.getEmail());
    user.setPhoneNumber(updatedUser.getPhoneNumber());
    user.setDateOfBirth(updatedUser.getDateOfBirth());

    return userRepository.save(user);
}
public User changePassword(Long id, String oldPassword, String newPassword) {

    User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
        throw new RuntimeException("Current password is incorrect");
    }

    user.setPassword(passwordEncoder.encode(newPassword));

    return userRepository.save(user);
}
public User changeEmail(Long id, String password, String newEmail) {

    User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!passwordEncoder.matches(password, user.getPassword())) {
        throw new RuntimeException("Incorrect password");
    }

    if (userRepository.existsByEmail(newEmail)) {
        throw new RuntimeException("Email already exists");
    }

    user.setEmail(newEmail);

    return userRepository.save(user);
}
public void deleteUser(Long id) {

    User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

    user.setActive(false);

    userRepository.save(user);
}
}