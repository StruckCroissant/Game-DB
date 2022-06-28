package com.StruckCroissant.GameDB.objects.user;

import java.util.ArrayList;
import java.util.List;

import com.StruckCroissant.GameDB.objects.game.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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

    List<String> authorities = new ArrayList<String>();
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
    boolean userExists = userDao.selectUserByUsername(user.getUsername()).isPresent();

    if (userExists) {
      throw new IllegalStateException("username already taken");
    }

    String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());

    user.setPassword(encodedPassword);

    userDao.updateUser(user);

    return true;
  }

  public List<Game> getSavedGames(int uid) {
    // TODO confirm user unique
    return userDao.selectSavedGames(uid);
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
