package com.StruckCroissant.GameDB.dao;

import com.StruckCroissant.GameDB.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Repository("db-user")
public class UserDAOImpl implements UserDao{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertUser(User user) {
        final String sql;
        if(user.getId() == null){ // Might not need - including for posterity
            sql = "INSERT INTO user (uid, username) VALUES (?, ?)";
            return jdbcTemplate.update(sql, user.getId(), user.getUsername());
        } else {
            sql = "INSERT INTO user (username) VALUES (?)";
            return jdbcTemplate.update(sql, user.getUsername());
        }
    }

    @Override
    public List<User> selectAllUsers() {
        final String sql = "SELECT uid, username FROM user";
        return jdbcTemplate.query(sql, (resultSet, i) -> {
            int uid = resultSet.getInt("uid");
            String username = resultSet.getString("username");
            return new User(uid, username);
        });
    }

    @Override
    public User selectUserById(int id) {
        final String sql = "SELECT uid, username FROM user WHERE uid = ? LIMIT 1";
        return jdbcTemplate.query(sql, (resultSet) -> {
            resultSet.first();
            int uid = resultSet.getInt("uid");
            String username = resultSet.getString("username");
            return new User(uid, username);
        }, id);
    }

    @Override
    public User selectUserByUsername(String inputUsername) {
        final String sql = "SELECT uid, username FROM user WHERE username = ? LIMIT 1";
        return jdbcTemplate.query(sql, (resultSet) -> {
            resultSet.first();
            int uid = resultSet.getInt("uid");
            String username = resultSet.getString("username");
            return new User(uid, username);
        }, inputUsername);
    }

    @Override
    public int deleteUserById(int id) {
        final String sql = "DELETE FROM user WHERE uid = ?";
        return jdbcTemplate.update(sql, id);
    }

    @Override
    public int updateUserById(int id, User user) {
        final String sql = "UPDATE user SET username = ? WHERE uid = ?";
        return jdbcTemplate.update(sql, user.getUsername(), id);
    }
}
