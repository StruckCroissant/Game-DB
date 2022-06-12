package com.StruckCroissant.GameDB.user;

import com.StruckCroissant.GameDB.user.models.User;
import com.StruckCroissant.GameDB.user.models.UserRegistrationRequest;
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

    @PostMapping(path = "/login")
    public HashMap<String, Object> loginUser(@RequestBody User user) {
        HashMap<String, Object> response = new HashMap<String, Object>();
        response.put("loginSuccess", userService.loginUser(user));
        return response;
    }


    @PostMapping("/register")
    public String registerUser(@RequestBody UserRegistrationRequest request){
        return userService.registerUser(request);
    }

    /*
    @GetMapping(path = "/byId")
    public HashMap<String, Object> getUserById(@RequestParam("id") int id) {
        return new SqlMetadataHandler(userService.getUserById(id)).getBody();
    }

     */

    /*
    @GetMapping(path = "/byUsername")
    public HashMap<String, Object> getUserByUsername(@RequestParam("username") String username) {
        return new SqlMetadataHandler(userService.getUserByUsername(username)).getBody();
    }

     */

    /*
    @DeleteMapping(path = "/byId")
    public void deleteUserById(@RequestParam("id") int id){
        userService.deleteUser(id);
    }

     */

    /*
    @PutMapping(path = "/byId")
    public void updateUser(@RequestParam("id") int id, @Valid @NonNull @RequestBody User userToUpdate){
        userService.updateUser(id, userToUpdate);
    }
     */
}
