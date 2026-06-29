package com.pocketplanner.controller;
import com.pocketplanner.dto.ChangePasswordRequest;
import com.pocketplanner.entity.User;
import com.pocketplanner.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.pocketplanner.dto.ChangePasswordRequest;
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://backup-kappa-two.vercel.app"
})
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.loginUser(
                user.getEmail(),
                user.getPassword()
        );
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id,
                           @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }
    @PutMapping("/{id}/change-password")
public User changePassword(
        @PathVariable Long id,
        @RequestBody ChangePasswordRequest request) {

    return userService.changePassword(
            id,
            request.getOldPassword(),
            request.getNewPassword()
    );
}
}