package com.StruckCroissant.GameDB.objects.game;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for retrieving information about games.
 * It contains simple endpoints for retrieving Game objects.
 * All calls are passed to the gameService for retrieval.
 *
 * @author Dakota Vaughn
 * @since 2022-06-20
 * @see Game
 * @see GameService
 */
@RequestMapping("api/v1/game")
@RestController
public class GameController {
  private final GameService gameService;

  /**
   * Autowired constructor retrieves gameService
   * via Autowire
   * @param gameService game service object
   */
  @Autowired
  public GameController(GameService gameService) {
    this.gameService = gameService;
  }

  /**
   * Returns all game objects in DB
   * @return List<Game>
   */
  @GetMapping(path = "/all")
  public List<Game> getAllGames() {
    return gameService.getAllGames();
  }

  /**
   * Returns game object when given an id
   * @param id game id
   * @return Game
   */
  @GetMapping(path = "/byId")
  public Game getGameById(@RequestParam("id") int id) {
    return gameService.getGameById(id); // TODO: Return Optional<Game>
  }
}
