package com.StruckCroissant.GameDB.api.game;

import com.StruckCroissant.GameDB.api.models.Game;

import java.util.List;

public interface GameDao{
    // TODO all return optional
    List<Game> selectAllGames();

    Game selectGameById(int id);
}
