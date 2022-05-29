package com.StruckCroissant.GameDB.sevice;

import com.StruckCroissant.GameDB.dao.GameDao;
import com.StruckCroissant.GameDB.model.Game;
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
