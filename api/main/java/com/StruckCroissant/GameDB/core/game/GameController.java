package com.StruckCroissant.GameDB.core.game;

import com.StruckCroissant.GameDB.core.GameDBCoreController;
import com.StruckCroissant.GameDB.validation.NullOrNotBlank;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for retrieving information about games. It contains simple endpoints for retrieving
 * Game objects. All calls are passed to the gameService for retrieval.
 *
 * @author Dakota Vaughn
 * @see Game
 * @see GameService
 * @since 2022-06-20
 */
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

  @GetMapping()
  public List<Game> search(
      @RequestParam(name = "name", required = false) @NullOrNotBlank String name,
      @RequestParam(name = "id", required = false) @NullOrNotBlank Integer id) {
    return gameService.searchGames(name, id);
  }
}
