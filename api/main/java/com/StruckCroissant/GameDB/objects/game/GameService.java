package com.StruckCroissant.GameDB.objects.game;

import com.StruckCroissant.GameDB.exceptions.GameNotFoundException;
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

  public Game getGameById(int id) {
    Game game =
        gameDao.selectGameById(id).orElseThrow(() -> new GameNotFoundException("Game not found!"));
    return gameDao.selectGameById(id).get();
  }
}
