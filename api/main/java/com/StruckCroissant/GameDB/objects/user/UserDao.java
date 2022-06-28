package com.StruckCroissant.GameDB.objects.user;

import com.StruckCroissant.GameDB.objects.game.Game;

import java.util.List;
import java.util.Optional;

public interface UserDao {
  // TODO all return Optional<>
  int insertUser(User user);

  List<User> selectAllUsers();

  Optional<User> selectUserById(int id);

  Optional<User> selectUserByUsername(String username);

  int deleteUserById(int id);

  int updateUserById(int id, User user);

  boolean updateUser(User user);

  boolean registerNewUser(User user);

  boolean userIsUnique(User user);

  boolean loginUser(User user);

  List<Game> selectSavedGames(int uid);
}
