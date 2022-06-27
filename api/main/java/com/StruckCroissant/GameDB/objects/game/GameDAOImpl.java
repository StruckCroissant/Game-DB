package com.StruckCroissant.GameDB.objects.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

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
    final String sql =
        "SELECT gid, gname, cost, discounted_cost, url, age_rating, indie,"
            + "description, rdate, rawgId FROM game";
    return jdbcTemplate.query(sql, (resultSet, i) -> getGame(resultSet));
  }

  /**
   * Selects game from database by id
   *
   * @param id game id
   * @return Optional<Game>
   */
  @Override
  public Optional<Game> selectGameById(int id) {
    final String sql =
        "SELECT gid, gname, cost, discounted_cost, url, age_rating, indie,"
            + "description, rdate, rawgId FROM game WHERE gid = ? LIMIT 1";
    return Optional.ofNullable(
        jdbcTemplate.query(
            sql,
            (resultSet) -> {
              if (resultSet.next()) {
                return getGame(resultSet);
              } else {
                return null;
              }
            },
            id));
  }

  /**
   * Private method that extracts game object from resultSet
   *
   * @param resultSet jdbcTemplate resultSet cursor
   * @return Game
   * @throws SQLException generic SQL exception
   */
  private Game getGame(ResultSet resultSet) throws SQLException {
    int gid = resultSet.getInt("gid");
    String gname = resultSet.getString("gname");
    String cost = resultSet.getString("cost");
    String discountedCost = resultSet.getString("discounted_cost");
    String url = resultSet.getString("url");
    String ageRating = resultSet.getString("age_rating");
    int indie = resultSet.getInt("indie");
    String description = resultSet.getString("description");
    String rdate = resultSet.getString("rdate");
    float rawgId = resultSet.getFloat("rawgId");

    return new Game(
        gid, gname, cost, discountedCost, url, ageRating, indie, description, rdate, rawgId);
  }
}
