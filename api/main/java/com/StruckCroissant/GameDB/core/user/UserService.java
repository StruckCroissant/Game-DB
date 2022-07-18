package com.StruckCroissant.GameDB.core.user;

import com.StruckCroissant.GameDB.core.game.Game;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
  private static final String USER_NOT_FOUND_MSG = "user with username %s not found";
  private final UserDao userDao;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired
  public UserService(
      @Qualifier("db-user") UserDao userDao, BCryptPasswordEncoder bCryptPasswordEncoder) {
    this.userDao = userDao;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  public List<User> getAllUsers() {
    return userDao.selectAllUsers();
  }

  private static List<GrantedAuthority> getAuthorities(List<String> roles) {
    List<GrantedAuthority> authorities = new ArrayList<>();
    for (String role : roles) {
      authorities.add(new SimpleGrantedAuthority(role));
    }
    return authorities;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

    User user =
        userDao
            .selectUserByUsername(username)
            .orElseThrow(
                () -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, username)));

    boolean enabled = true;
    boolean accountNonExpired = true;
    boolean credentialsNonExpired = true;
    boolean accountNonLocked = true;

    List<String> authorities = new ArrayList<>();
    authorities.add(user.getRole().toString());

    return new org.springframework.security.core.userdetails.User(
        user.getUsername(),
        user.getPassword(),
        enabled,
        accountNonExpired,
        credentialsNonExpired,
        accountNonLocked,
        getAuthorities(authorities));
  }

  public Boolean signUpUser(User user) {
    userDao
        .selectUserByUsername(user.getUsername())
        .ifPresent(
            u -> {
              throw new RuntimeException(
                  String.format("User with username %s already exists", user.getUsername()));
            });

    String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());

    user.setPassword(encodedPassword);

    userDao.insertUser(user);

    return true;
  }

  public List<Game> getSavedGames(int uid) {
    // TODO confirm user unique
    return userDao.selectSavedGames(uid);
  }

  public User getUserById(int id) {
    return userDao
        .selectUserById(id)
        .orElseThrow(
            () -> {
              throw new ResourceNotFoundException(String.format("User with id %s not found", id));
            });
  }

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
