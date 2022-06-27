package com.StruckCroissant.GameDB.objects.user;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
@Repository("db-user")
public class UserDAOImpl implements UserDao {
  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public UserDAOImpl(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public int insertUser(User user) {
    final String sql;
    if (user.getId().isPresent()) { // Might not need due to Auto_inc - including for posterity
      sql = "INSERT INTO user (uid, username, password) VALUES (?, ?, ?)";
      return jdbcTemplate.update(sql, user.getId(), user.getUsername(), user.getPassword());
    } else {
      sql = "INSERT INTO user (username, password) VALUES (?, ?)";
      return jdbcTemplate.update(sql, user.getUsername(), user.getPassword());
    }
  }

  @Override
  public List<User> selectAllUsers() {
    final String sql =
        "SELECT u.uid, u.username, u.password, u.locked, u.enabled, r.role "
            + "FROM user u, role r where u.uid = r.uid";
    return jdbcTemplate.query(sql, (resultSet, i) -> getUser(resultSet));
  }

  @Override
  public Optional<User> selectUserById(int id) {
    final String sql =
        "SELECT u.uid, u.username, u.password, u.locked, u.enabled, r.role "
            + "FROM user u, role r WHERE u.uid = ? AND u.uid = r.uid LIMIT 1";
    return Optional.ofNullable(
        jdbcTemplate.query(
            sql,
            (resultSet) -> {
              if (resultSet.next()) {
                return getUser(resultSet);
              } else {
                return null;
              }
            },
            id));
  }

  @NotNull
  private User getUser(ResultSet resultSet) throws SQLException {
    int uid = resultSet.getInt("uid");
    String username = resultSet.getString("username");
    String password = resultSet.getString("password");
    UserRoleEnum role = UserRoleEnum.valueOf(resultSet.getString("role"));
    Boolean locked = resultSet.getBoolean("locked");
    Boolean enabled = resultSet.getBoolean("enabled");
    return new User(uid, username, password, role, locked, enabled);
  }

  @Override
  public Optional<User> selectUserByUsername(String username) {
    final String sql =
        "SELECT u.uid, u.username, u.password, u.locked, u.enabled, r.role FROM user u,"
            + " role r WHERE u.username = ? AND u.uid = r.uid LIMIT 1";
    return Optional.ofNullable(
        jdbcTemplate.query(
            sql,
            (ResultSet resultSet) -> {
              if (resultSet.next()) {
                return getUser(resultSet);
              } else {
                return null;
              }
            },
            username));
  }

  public Optional<Integer> getUidByUsername(String username) {
    final String sql = "SELECT uid FROM user WHERE username = ? LIMIT 1";
    return Optional.ofNullable(
        jdbcTemplate.query(
            sql,
            (resultSet) -> {
              if (resultSet.next()) {
                return resultSet.getInt("uid");
              } else {
                return null;
              }
            },
            username));
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
  public boolean updateUser(User user) {
    final String SQL_INSERT_USER =
        "INSERT INTO user (username, password, locked, enabled) VALUES (?, ?, ?, ?);";
    final String SQL_INSERT_ROLE_USER = "INSERT INTO role (uid, role) VALUES (?, ?);";

    boolean insertSuccess = false;

    jdbcTemplate.update(
        SQL_INSERT_USER,
        user.getUsername(),
        user.getPassword(),
        !user.isAccountNonLocked(),
        user.isEnabled()
    );
    Optional<Integer> uidOpt = getUidByUsername(user.getUsername());

    if (uidOpt.isPresent()) {
      int UID = uidOpt.get();
      if (jdbcTemplate.update(SQL_INSERT_ROLE_USER, UID, user.getRole().toString()) == 1) {
        insertSuccess = true;
      }
    }

    return insertSuccess;
  }

  @Override
  public boolean registerNewUser(User user) {
    if (userIsUnique(user)) {
      insertUser(user);
      return true;
    } else {
      return false;
    }
  }

  @Override
  public boolean userIsUnique(User user) {
    final String sql = "SELECT COUNT(*) FROM user WHERE username = ?";
    Integer amnt =
        jdbcTemplate.query(
            sql,
            (resultSet) -> {
              if (resultSet.next()) {
                return resultSet.getInt("count(*)");
              } else {
                return null;
              }
            },
            user.getUsername());
    assert amnt != null;
    return amnt == 0;
  }

  public boolean loginUser(User user) {
    final String sql = "SELECT COUNT(*) FROM user WHERE username = ? AND password = ?";
    Integer amnt =
        jdbcTemplate.query(
            sql,
            (resultSet) -> {
              if (resultSet.next()) {
                return resultSet.getInt("count(*)");
              } else {
                return null;
              }
            },
            user.getUsername(),
            user.getPassword());
    assert amnt != null;
    return amnt == 1;
  }
}
