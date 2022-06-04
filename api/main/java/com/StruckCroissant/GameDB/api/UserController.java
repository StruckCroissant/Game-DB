package com.StruckCroissant.GameDB.api;

import com.StruckCroissant.GameDB.model.DbModelObj;
import com.StruckCroissant.GameDB.model.User;
import com.StruckCroissant.GameDB.sevice.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
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
    public HashMap<String, Object> getAllUsers() {
        return new MetadataHandler(userService.getAllUsers()).getBody();
    }

    @GetMapping(path = "/byId")
    public HashMap<String, Object> getUserById(@RequestParam("id") int id) {
        return new MetadataHandler(userService.getUserById(id)).getBody();
    }

    @GetMapping(path = "/byUsername")
    public HashMap<String, Object> getUserByUsername(@RequestParam("username") String username) {
        return new MetadataHandler(userService.getUserByUsername(username)).getBody();
    }

    @DeleteMapping(path = "/byId")
    public void deleteUserById(@RequestParam("id") int id){
        userService.deleteUser(id);
    }

    @PutMapping(path = "/byId")
    public void updateUser(@RequestParam("id") int id, @Valid @NonNull @RequestBody User userToUpdate){
        userService.updateUser(id, userToUpdate);
    }

    @PutMapping(path = "/login")
    public HashMap<String, Object> loginUser(@RequestParam("username") String username) {
        if(userService.getUserByUsername(username) == null){
            userService.addUser(new User(username));
        }
        return new MetadataHandler(userService.getUserByUsername(username)).getBody();
    }
}
