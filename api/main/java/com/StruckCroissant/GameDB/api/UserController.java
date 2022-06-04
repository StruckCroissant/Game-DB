package com.StruckCroissant.GameDB.api;

import com.StruckCroissant.GameDB.model.DbModelObj;
import com.StruckCroissant.GameDB.model.User;
import com.StruckCroissant.GameDB.sevice.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RequestMapping("api/v1/user")
@RestController
public class UserController {

    private final UserService userService;

    private final MetadataHandler metadataHandler;

    @Autowired
    public UserController(UserService userService, MetadataHandler metadataHandler) {
        this.metadataHandler = metadataHandler;
        this.userService = userService;
    }

    @PostMapping
    public void addUser(@Valid @NonNull @RequestBody User user){
        userService.addUser(user);
    }

    @GetMapping(path = "/all")
    public HashMap<String, Object> getAllUsers() {
        return metadataHandler.addMetadata(userService.getAllUsers());
    }

    @GetMapping(path = "/byId")
    public HashMap<String, Object> getUserById(@RequestParam("id") int id) {
        return metadataHandler.addMetadata(userService.getUserById(id));
    }

    @GetMapping(path = "/byUsername")
    public HashMap<String, Object> getUserByUsername(@RequestParam("username") String username) {
        return metadataHandler.addMetadata(userService.getUserByUsername(username));
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
