package com.StruckCroissant.GameDB.core.game;

import org.jetbrains.annotations.Nullable;

import java.util.List;
import java.util.Optional;

/**
 * Interface for Game Data Access Object
 *
 * @author Dakota Vaughn
 * @since 2022-06-20
 */
public interface GameDao {
  // TODO all return optional

  List<Game> selectAllGames();

  Optional<Game> selectGameById(int id);

  List<Game> selectRelatedGames(int id);

  List<Game> searchGames(@Nullable String name, @Nullable Integer id);
}
