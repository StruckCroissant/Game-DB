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
        if(user.getId() == null){ // Might not need due to Auto_inc - including for posterity
            sql = "INSERT INTO user (uid, username, password) VALUES (?, ?, ?)";
            return jdbcTemplate.update(sql, user.getId(), user.getUsername(), user.getPassword());
        } else {
            sql = "INSERT INTO user (username, password) VALUES (?, ?)";
            return jdbcTemplate.update(sql, user.getUsername(), user.getPassword());
        }
    }

    @Override
    public List<User> selectAllUsers() {
        final String sql = "SELECT uid, username, password FROM user";
        return jdbcTemplate.query(sql, (resultSet, i) -> {
            int uid = resultSet.getInt("uid");
            String username = resultSet.getString("username");
            String password = resultSet.getString("password");
            return new User(uid, username, password);
        });
    }

    @Override
    public User selectUserById(int id) {
        final String sql = "SELECT uid, username FROM user WHERE uid = ? LIMIT 1";
        return jdbcTemplate.query(sql, (resultSet) -> {
            if (resultSet.next()) {
                int uid = resultSet.getInt("uid");
                String username = resultSet.getString("username");
                String password = resultSet.getString("password");
                return new User(uid, username, password);
            } else {
                return null;
            }
        }, id);
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

    @Override
    public boolean registerNewUser(User user) {
        if(userIsUnique(user)){
            insertUser(user);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean userIsUnique(User user) {
        final String sql = "SELECT COUNT(*) FROM user WHERE username = ?";
        Integer amnt = jdbcTemplate.query(sql, (resultSet) -> {
            if(resultSet.next()){
                return resultSet.getInt("count(*)");
            } else {
                return null;
            }
        }, user.getUsername());
        assert amnt != null;
        return amnt == 0;
    }

    public boolean loginUser(User user) {
        final String sql = "SELECT COUNT(*) FROM user WHERE username = ? AND password = ?";
        Integer amnt = jdbcTemplate.query(sql, (resultSet) -> {
            if(resultSet.next()){
                return resultSet.getInt("count(*)");
            } else {
                return null;
            }
        }, user.getUsername(), user.getPassword());
        assert amnt != null;
        return amnt == 1;
    }
}
