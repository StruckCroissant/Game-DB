package com.StruckCroissant.GameDB.api.user;

import java.util.List;
import java.util.Optional;

import com.StruckCroissant.GameDB.api.models.User;

public interface UserDao {
    // TODO all return Optional<>
    int insertUser(User user);

    List<User> selectAllUsers();

    Optional<User> selectUserById(int id);

    Optional<User> selectUserByUsername(String username);

    int deleteUserById(int id);

    int updateUserById(int id, User user);

    int updateUser(User user);

    boolean registerNewUser(User user);

    boolean userIsUnique(User user);

    boolean loginUser(User user);
}
