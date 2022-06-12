package com.StruckCroissant.GameDB.game;

import com.StruckCroissant.GameDB.game.models.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RequestMapping("api/v1/game")
@RestController
public class GameController {
    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping(path = "/all")
    public List<Game> getAllGames(){
        return gameService.getAllGames();
    }

    @GetMapping(path = "/byId")
    public Game getGameById(@RequestParam("id") int id){
        return gameService.getGameById(id); // TODO: Return Optional<Game>
    }
}
