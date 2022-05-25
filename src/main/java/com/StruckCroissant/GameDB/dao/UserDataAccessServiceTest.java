package com.StruckCroissant.GameDB.dao;

import com.StruckCroissant.GameDB.model.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("fakeDao")
public class UserDataAccessServiceTest implements UserDao{

    private static List<User> DB = new ArrayList<User>();
    @Override
    public int insertUser(UUID id, User user) {
        DB.add(new User(id, user.getUsername()));
        return 1;
    }

    public List<User> selectAllUsers(){
        return DB;
    }

    @Override
    public Optional<User> selectUserById(UUID id) {
        return DB.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst();
    }

    @Override
    public int deleteUserById(UUID id) {
        Optional<User> user = selectUserById(id);

        if(user.isEmpty()){
            return 0;
        }
        DB.remove(user.get());
        return 1;
    }

    @Override
    public int updateUserById(UUID id, User update) {
        return selectUserById(id)
                .map(user -> {
                    int indexOfUserToUpdate = DB.indexOf(user);
                    if(indexOfUserToUpdate >= 0) {
                        DB.set(indexOfUserToUpdate, new User(id, update.getUsername()));
                        return 1;
                    }
                    return 0;
                })
                .orElse(0);
    }
}
