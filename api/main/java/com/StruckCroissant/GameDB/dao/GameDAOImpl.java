package com.StruckCroissant.GameDB.dao;

import com.StruckCroissant.GameDB.model.Game;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
@Repository("db-game")
public class GameDAOImpl implements GameDao{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public GameDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Game> selectAllGames() {
        final String sql = "SELECT gid, gname, cost, discounted_cost, url, age_rating, indie," +
                "description, rdate, rawgId FROM game";
        return jdbcTemplate.query(sql, (resultSet, i) -> {
            return getGame(resultSet);
        });
    }

    @Override
    public Game selectGameById(int id) {
        final String sql = "SELECT gid, gname, cost, discounted_cost, url, age_rating, indie," +
                "description, rdate, rawgId FROM game WHERE gid = ?";
        return jdbcTemplate.query(sql, (resultSet) -> {
            resultSet.first();
            return getGame(resultSet);
        }, id);
    }

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

        return new Game(gid, gname, cost, discountedCost, url, ageRating, indie, description, rdate, rawgId);
    }
}
