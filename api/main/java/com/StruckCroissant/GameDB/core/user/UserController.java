package com.StruckCroissant.GameDB.core.user;

import java.security.Principal;
import java.util.List;

import com.StruckCroissant.GameDB.core.game.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;



@RequestMapping("api/v1/user")
@CrossOrigin(origins = "*", maxAge= 3600,
  allowedHeaders={"x-auth-token", "x-requested-with", "x-xsrf-token"})// Replace with proxy later
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

  @GetMapping(path = "/byId")
  public User getUserById(@RequestParam("id") int id) {
    return userService.getUserById(id);
  }

  @GetMapping(path = "/saved-games")
  public List<Game> getSavedGames(@RequestParam("id") int uid) {
    return userService.getSavedGames(uid);
  }

  @GetMapping()
  public Principal user(Principal user) {
    return user;
  }

}
