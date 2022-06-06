package com.StruckCroissant.GameDB.api;

import com.StruckCroissant.GameDB.model.User;
import com.StruckCroissant.GameDB.sevice.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;

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
    public HashMap<String, Object> getAllUsers() {
        return new SqlMetadataHandler(userService.getAllUsers()).getBody();
    }

    @GetMapping(path = "/byId")
    public HashMap<String, Object> getUserById(@RequestParam("id") int id) {
        return new SqlMetadataHandler(userService.getUserById(id)).getBody();
    }

    /*
    @GetMapping(path = "/byUsername")
    public HashMap<String, Object> getUserByUsername(@RequestParam("username") String username) {
        return new SqlMetadataHandler(userService.getUserByUsername(username)).getBody();
    }

     */

    @DeleteMapping(path = "/byId")
    public void deleteUserById(@RequestParam("id") int id){
        userService.deleteUser(id);
    }

    @PutMapping(path = "/byId")
    public void updateUser(@RequestParam("id") int id, @Valid @NonNull @RequestBody User userToUpdate){
        userService.updateUser(id, userToUpdate);
    }


    @PostMapping(path = "/login")
    public HashMap<String, Object> loginUser(@RequestBody User user) {
        HashMap<String, Object> response = new HashMap<String, Object>();
        response.put("loginSuccess", userService.loginUser(user));
        return response;
    }


    @PostMapping("/register")
    public HashMap<String, Object> registerUser(@RequestBody User newUser){
        HashMap<String, Object> response = new HashMap<String, Object>();
        response.put("registerSuccess", userService.registerUser(newUser));
        return response;
    }
}
