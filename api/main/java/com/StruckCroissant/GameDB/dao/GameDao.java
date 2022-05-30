package com.StruckCroissant.GameDB.dao;

import com.StruckCroissant.GameDB.model.Game;

import java.util.List;

public interface GameDao{

    List<Game> selectAllGames();

    Game selectGameById(int id);
}
