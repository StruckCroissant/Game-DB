package com.StruckCroissant.GameDB.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import com.StruckCroissant.GameDB.model.User;

public interface UserDao {

    int insertUser(User user);

    List<User> selectAllUsers();

    User selectUserById(int id);

    //User selectUserByUsername(String username);

    int deleteUserById(int id);

    int updateUserById(int id, User user);

    boolean registerNewUser(User user);

    boolean userIsUnique(User user);

    boolean loginUser(User user);
}
