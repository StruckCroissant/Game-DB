package com.StruckCroissant.GameDB.api.game;

import com.StruckCroissant.GameDB.api.game.models.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {
    private final GameDao gameDao;

    @Autowired
    public GameService(@Qualifier("db-game") GameDao gameDao) {
        this.gameDao = gameDao;
    }

    public List<Game> getAllGames(){
        return gameDao.selectAllGames();
    }

    public Game getGameById(int id){
        return gameDao.selectGameById(id);
    }
}
