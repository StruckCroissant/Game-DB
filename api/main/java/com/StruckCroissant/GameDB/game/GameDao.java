package com.StruckCroissant.GameDB.game;

import com.StruckCroissant.GameDB.game.models.Game;

import java.util.List;

public interface GameDao{
    // TODO all return optional
    List<Game> selectAllGames();

    Game selectGameById(int id);
}
