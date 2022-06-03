package com.StruckCroissant.GameDB.api;

import com.StruckCroissant.GameDB.model.User;
import com.StruckCroissant.GameDB.sevice.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("api/v1/user")
@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public void addUser(@Valid @NonNull @RequestBody User user){
        userService.addUser(user);
    }

    @GetMapping(path = "/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(path = "/byId")
    public User getUserById(@RequestParam("id") int id) {
        return userService.getUserById(id);
    }

    @GetMapping(path = "/byUsername")
    public User getUserByUsername(@RequestParam("username") String username) {
        return userService.getUserByUsername(username);
    }

    @DeleteMapping(path = "/byId")
    public void deleteUserById(@RequestParam("id") int id){
        userService.deleteUser(id);
    }

    @PutMapping(path = "/byId")
    public void updateUser(@RequestParam("id") int id, @Valid @NonNull @RequestBody User userToUpdate){
        userService.updateUser(id, userToUpdate);
    }
}
