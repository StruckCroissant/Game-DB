package com.StruckCroissant.GameDB.core.game;

import java.util.List;
import java.util.Optional;

import com.StruckCroissant.GameDB.core.SimpleQueryBuilder;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

/**
 * Data Access Implementation for accessing Game objects.
 *
 * @author Dakota Vaughn
 * @since 2022-06-20
 */
@Service
@Repository("db-game")
public class GameDAOImpl implements GameDao {
  private final JdbcTemplate jdbcTemplate;

  private SimpleQueryBuilder getDefaultQueryBuilder() {
    SimpleQueryBuilder builder = new SimpleQueryBuilder();
    return builder.addSelect("game.gid")
        .addSelect("game.gname")
        .addSelect("game.cost")
        .addSelect("game.discounted_cost")
        .addSelect("game.url")
        .addSelect("game.age_rating")
        .addSelect("game.indie")
        .addSelect("game.description")
        .addSelect("GROUP_CONCAT(genre.genre_name) as genres")
        .addSelect("franchise.fname as franchise")
        .addSelect("game.rdate")
        .addSelect("game.rawgId")
        .addFrom("game LEFT JOIN gamegenre game_genre ON game.gid = game_genre.gid")
        .addFrom("LEFT JOIN genre ON genre.genre_id = game_genre.genre_id")
        .addFrom("LEFT JOIN franchise franchise ON game.gid = franchise.gid")
        .addGroupBy("game.gid");
  }

  private List<Game> executeQuery(String SQL, Object... args) {
    return jdbcTemplate.query(
        SQL,
        (resultSet, i) -> SQLGameAccessor.getGameFromResultSet(resultSet),
        args
    );
  }

  /**
   * Constructor that initializes Object with a jdbcTemplate via Autowire
   *
   * @param jdbcTemplate SQL execution object
   */
  @Autowired
  public GameDAOImpl(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  /**
   * Selects all games from database
   *
   * @return List<Game>
   */
  @Override
  public List<Game> selectAllGames() {
    final String sql = this.getDefaultQueryBuilder().toString();
    return this.executeQuery(sql);
  }

  /**
   * Selects game from database by id
   *
   * @param id game id
   * @return Optional<Game>
   */
  @Override
  public Optional<Game> selectGameById(int id) {
    final String sql = this.getDefaultQueryBuilder()
        .addWhere("g.gid = ?")
        .setLimit(1)
        .toString();
    final List<Game> result = this.executeQuery(sql, id);
    return Optional.ofNullable(result.isEmpty() ? result.get(0) : null);
  }

  @Override
  public List<Game> selectRelatedGames(int id) {
    final String SQL = this.getDefaultQueryBuilder()
        .addFrom("INNER JOIN gamegenre game_genre2 ON game_genre.genre_id = game_genre2.genre_id AND game_genre.gid <> game_genre2.gid")
        .addWhere("game_genre2.gid = ?")
        .addOrderBy("COUNT(game_genre2.genre_id) DESC")
        .setLimit(10)
        .toString();
    return jdbcTemplate.query(
        SQL, (resultSet, i) -> SQLGameAccessor.getGameFromResultSet(resultSet), id);
  }

  public List<Game> searchGames(@Nullable String name, @Nullable Integer id) {
    final String SQL = this.getDefaultQueryBuilder()
        .addWhere("game.gname LIKE CONCAT(?, '%')")
        .addWhere("OR game.gid = ?")
        .toString();
    return jdbcTemplate.query(
        SQL, (resultSet, i) -> SQLGameAccessor.getGameFromResultSet(resultSet), name, id);
  }
}
