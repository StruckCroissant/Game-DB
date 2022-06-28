package com.StruckCroissant.GameDB.objects.user;

import java.util.List;

import com.StruckCroissant.GameDB.objects.game.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

  @GetMapping(path = "/saved-games")
  public List<Game> getSavedGames(@RequestParam("id") int uid) {
    return userService.getSavedGames(uid);
  }
}
