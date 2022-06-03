package com.StruckCroissant.GameDB.api;

import com.StruckCroissant.GameDB.model.Game;
import com.StruckCroissant.GameDB.sevice.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/v1/game")
@RestController
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public List<Game> getAllGames(){
        return gameService.getAllGames();
    }

    @GetMapping(path = "/byId")
    public Game getGameById(@RequestParam("id") int id){
        return gameService.getGameById(id);
    }
}
