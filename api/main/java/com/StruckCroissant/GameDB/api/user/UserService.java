package com.StruckCroissant.GameDB.api.user;

import com.StruckCroissant.GameDB.api.user.models.User;
import com.StruckCroissant.GameDB.api.user.models.UserRegistrationRequest;
import com.StruckCroissant.GameDB.api.user.models.UserRoleEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {
    private final UserDao userDao;

    private final EmailValidator emailValidator;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final static String USER_NOT_FOUND_MSG =
            "user with username %s not found";

    @Autowired
    public UserService(
            @Qualifier("db-user") UserDao userDao,
            EmailValidator emailValidator,
            BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDao = userDao;
        this.emailValidator = emailValidator;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public List<User> getAllUsers() {
        return userDao.selectAllUsers();
    }

    public int addUser(User user) {
        return userDao.insertUser(user);
    }

    public String registerUser(UserRegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
        if(!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }
        User newUser = new User(
                request.getUsername(), request.getPassword(),
                request.getEmail(), UserRoleEnum.USER,
                false, true);

        return signUpUser(newUser);
    }

    public boolean loginUser(User user) {
        return userDao.loginUser(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userDao.selectUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format(USER_NOT_FOUND_MSG, username)));
    }

    public String signUpUser(User user) {
        boolean userExists = userDao
                .selectUserByUsername(user.getUsername())
                .isPresent();

        if(userExists) {
            throw new IllegalStateException("username already taken");
        }

        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);

        userDao.updateUser(user);

        String token = UUID.randomUUID().toString();

        // TODO fill in token system

        return token;
    }

    /*
    public User getUserById(int id){
        return userDao.selectUserById(id);
    }

     */

    /*
    public int deleteUser(int id){
        return userDao.deleteUserById(id);
    }

     */

    /*
    public int updateUser(int id, User newUser){
        return userDao.updateUserById(id, newUser);
    }
     */
}
