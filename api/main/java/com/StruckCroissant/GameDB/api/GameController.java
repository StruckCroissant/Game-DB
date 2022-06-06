package com.StruckCroissant.GameDB.api;

import com.StruckCroissant.GameDB.sevice.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RequestMapping("api/v1/game")
@RestController
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping(path = "/all")
    public HashMap<String, Object> getAllGames(){
        return new SqlMetadataHandler(gameService.getAllGames()).getBody();
    }

    @GetMapping(path = "/byId")
    public HashMap<String, Object> getGameById(@RequestParam("id") int id){
        return new SqlMetadataHandler(gameService.getGameById(id)).getBody();
    }
}
