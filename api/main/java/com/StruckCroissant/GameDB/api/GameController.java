package com.StruckCroissant.GameDB.api;

import com.StruckCroissant.GameDB.model.Game;
import com.StruckCroissant.GameDB.sevice.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RequestMapping("api/v1/game")
@RestController
public class GameController {

    private final GameService gameService;

    private final MetadataHandler metadataHandler;

    @Autowired
    public GameController(GameService gameService, MetadataHandler metadataHandler) {
        this.gameService = gameService;
        this.metadataHandler = metadataHandler;
    }

    @GetMapping(path = "/all")
    public HashMap<String, Object> getAllGames(){
        return metadataHandler.addMetadata(gameService.getAllGames());
    }

    @GetMapping(path = "/byId")
    public HashMap<String, Object> getGameById(@RequestParam("id") int id){
        return metadataHandler.addMetadata(gameService.getGameById(id));
    }
}
