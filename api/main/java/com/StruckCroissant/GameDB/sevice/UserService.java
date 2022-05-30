package com.StruckCroissant.GameDB.sevice;

import com.StruckCroissant.GameDB.dao.UserDao;
import com.StruckCroissant.GameDB.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserDao userDao;

    @Autowired
    public UserService(@Qualifier("db-user") UserDao userDao) {
        this.userDao = userDao;
    }

    public int addUser(User user) {
        return userDao.insertUser(user);
    }

    public List<User> getAllUsers() {
        return userDao.selectAllUsers();
    }

    public User getUserById(int id){
        return userDao.selectUserById(id);
    }

    public int deleteUser(int id){
        return userDao.deleteUserById(id);
    }

    public int updateUser(int id, User newUser){
        return userDao.updateUserById(id, newUser);
    }
}
