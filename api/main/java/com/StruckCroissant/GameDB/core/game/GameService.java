package com.StruckCroissant.GameDB.core.game;

import com.StruckCroissant.GameDB.exception.exceptions.GameNotFoundException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class GameService {
  private final GameDao gameDao;

  @Autowired
  public GameService(@Qualifier("db-game") GameDao gameDao) {
    this.gameDao = gameDao;
  }

  public List<Game> getAllGames() {
    return gameDao.selectAllGames();
  }

  public Game getGameById(int id) throws GameNotFoundException {
    return gameDao.selectGameById(id).orElseThrow(() -> new GameNotFoundException(id));
  }

  public List<Game> getRelatedGames(int id) throws GameNotFoundException {
    gameDao.selectGameById(id).orElseThrow(() -> new GameNotFoundException(id));
    return gameDao.selectRelatedGames(id);
  }
}
