package com.StruckCroissant.GameDB.objects.game;

import java.util.List;

public interface GameDao{
    // TODO all return optional
    List<Game> selectAllGames();

    Game selectGameById(int id);
}
