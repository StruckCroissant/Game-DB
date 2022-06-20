package com.StruckCroissant.GameDB.objects.game;

import java.util.List;
import java.util.Optional;

public interface GameDao {
  // TODO all return optional
  List<Game> selectAllGames();

  Optional<Game> selectGameById(int id);
}
