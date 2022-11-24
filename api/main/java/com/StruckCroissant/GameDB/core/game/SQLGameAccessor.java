package com.StruckCroissant.GameDB.core.game;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SQLGameAccessor {
  /**
   * Private method that extracts game object from resultSet
   *
   * @param resultSet jdbcTemplate resultSet cursor
   * @return Game
   * @throws SQLException generic SQL exception
   */
  public static Game getGameFromResultSet(ResultSet resultSet) throws SQLException {
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
    String genresJoined = resultSet.getString("genres");
    String franchise = resultSet.getString("franchise");

    List<String> genres = new ArrayList<>();
    if (genresJoined != null) {
      genres = Arrays.asList(genresJoined.split(","));
    }

    return new Game(
        gid,
        gname,
        cost,
        discountedCost,
        url,
        ageRating,
        indie,
        description,
        genres,
        franchise,
        rdate,
        rawgId);
  }
}
