package com.StruckCroissant.GameDB.core.game;

import java.util.List;
import java.util.Optional;
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
        """
        SELECT
            g.gid,
            g.gname,
            g.cost,
            g.discounted_cost,
            g.url,
            g.age_rating,
            g.indie,
            g.description,
            GROUP_CONCAT(gn.genre_name) as genres,
            f.fname as franchise,
            g.rdate,
            g.rawgId
        FROM
            game g LEFT JOIN gamegenre ggn ON
                g.gid = ggn.gid
            LEFT JOIN genre gn ON
                gn.genre_id = ggn.genre_id
            LEFT JOIN franchise f ON
                g.gid = f.gid
        GROUP BY g.gid
        ;
        """;
    return jdbcTemplate.query(
        sql, (resultSet, i) -> SQLGameAccessor.getGameFromResultSet(resultSet));
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
        """
        SELECT
            g.gid,
            g.gname,
            g.cost,
            g.discounted_cost,
            g.url,
            g.age_rating,
            g.indie,
            g.description,
            GROUP_CONCAT(gn.genre_name) as genres,
            f.fname as franchise,
            g.rdate,
            g.rawgId
        FROM
            game g LEFT JOIN gamegenre ggn ON
                g.gid = ggn.gid
            LEFT JOIN genre gn ON
                gn.genre_id = ggn.genre_id
            LEFT JOIN franchise f ON
                g.gid = f.gid
        WHERE g.gid = ?
        GROUP BY
            g.gid
        LIMIT 1
        ;
        """;
    return Optional.ofNullable(
        jdbcTemplate.query(
            sql,
            (resultSet) -> {
              if (resultSet.next()) {
                return SQLGameAccessor.getGameFromResultSet(resultSet);
              } else {
                return null;
              }
            },
            id));
  }

  @Override
  public List<Game> selectRelatedGames(int id) {
    final String SQL =
        """
         SELECT
             g.gid,
             g.gname,
             g.cost,
             g.discounted_cost,
             g.url,
             g.age_rating,
             g.indie,
             g.description,
             g.rdate,
             g.rawgId,
             group_concat(gen.genre_name) AS genres,
             f.fname as franchise
         FROM
             gamegenre gm1 INNER JOIN
               gamegenre gm2 ON
                 gm1.genre_id = gm2.genre_id AND gm1.gid <> gm2.gid
             INNER JOIN
               game g ON gm2.gid = g.gid
             INNER JOIN
               genre gen on gm2.genre_id = gen.genre_id
             LEFT JOIN franchise f ON
               g.gid = f.gid
         WHERE
             gm1.gid = ?
         group by gm2.gid
         order by COUNT(gm2.genre_id) DESC
         LIMIT 10;
        """;
    return jdbcTemplate.query(
        SQL, (resultSet, i) -> SQLGameAccessor.getGameFromResultSet(resultSet), id);
  }

  public List<Game> searchGames(String name) {
    final String SQL = """
     SELECT
     g.gid,
     g.gname,
     g.cost,
     g.discounted_cost,
     g.url,
     g.age_rating,
     g.indie,
     g.description,
     g.rdate,
     g.rawgId,
     GROUP_CONCAT(gen.genre_name) AS genres,
     f.fname as franchise
     FROM game g
      LEFT JOIN gamegenre gg ON gg.gid = g.gid
      LEFT JOIN genre gen ON gg.genre_id = gen.genre_id
      LEFT JOIN franchise f ON g.gid = f.gid
     WHERE g.gname LIKE CONCAT(?, '%')
     GROUP BY g.gid
    """;
    return jdbcTemplate.query(
        SQL,
        (resultSet, i) -> SQLGameAccessor.getGameFromResultSet(resultSet),
        name
    );
  }
}
