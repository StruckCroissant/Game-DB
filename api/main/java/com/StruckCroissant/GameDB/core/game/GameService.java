package com.StruckCroissant.GameDB.core.game;

import com.StruckCroissant.GameDB.exception.exceptions.GameNotFoundException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 * Responsible for providing business logic for game retrieval
 *
 * @author Dakota Vaughn
 * @since 2022-06-20
 */
@Service
public class GameService {
  private final GameDao gameDao;

  /**
   * Autowired constructor accesses GameDao
   *
   * @param gameDao game dao object
   */
  @Autowired
  public GameService(@Qualifier("db-game") GameDao gameDao) {
    this.gameDao = gameDao;
  }

  /**
   * Calls gameDao to select all games in database
   *
   * @return List<Game>
   */
  public List<Game> getAllGames() {
    return gameDao.selectAllGames();
  }

  /**
   * Calls gameDao to select game by passed id
   *
   * @param id game int pk
   * @return Game
   * @throws GameNotFoundException missing game exception
   */
  public Game getGameById(int id) throws GameNotFoundException {
    return gameDao
        .selectGameById(id)
        .orElseThrow(() -> new GameNotFoundException("Game id {" + id + "} not found"));
  }

  public List<Game> getRelatedGames(int id) throws GameNotFoundException {
    // Just used to throw exception if game doesn't exist. Not sure if this is the best pattern
    gameDao
        .selectGameById(id)
        .orElseThrow(() -> new GameNotFoundException("Game id {" + id + "} not found"));
    return gameDao.selectRelatedGames(id);
  }
}
