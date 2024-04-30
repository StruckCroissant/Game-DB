package com.StruckCroissant.GameDB.core.game;

import com.StruckCroissant.GameDB.core.GameDBCoreController;

import java.util.List;

import com.StruckCroissant.GameDB.exception.exceptions.GameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.DecimalMin;

@CrossOrigin("http://localhost:4200") // Replace with proxy later
@RequestMapping("/game")
@RestController
public class GameController extends GameDBCoreController {
  private final GameService gameService;

  /**
   * Autowired constructor retrieves gameService via Autowire
   *
   * @param gameService game service object
   */
  @Autowired
  public GameController(GameService gameService) {
    this.gameService = gameService;
  }

  /**
   * Returns all game objects in DB
   *
   * @return List<Game>
   */
  @GetMapping(path = "/all")
  public List<Game> getAllGames() {
    return gameService.getAllGames();
  }

  @GetMapping(path = "/related")
  public List<Game> getRelatedGames(@RequestParam("id") int id) {
    return gameService.getRelatedGames(id);
  }

  @GetMapping
  public List<Game> search(@Valid GameSearchRequest request) {
    return gameService.searchGames(request.name(), request.id());
  }

  @GetMapping("/{id}")
  public Game getGame(@PathVariable @Valid @DecimalMin(value = "1") Integer id) throws GameNotFoundException {
    return gameService.getGameById(id);
  }
}
