package com.StruckCroissant.GameDB.objects.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    // TODO split user functions into access & registration

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
