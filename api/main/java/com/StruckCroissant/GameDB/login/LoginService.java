package com.StruckCroissant.GameDB.login;

import com.StruckCroissant.GameDB.core.user.User;
import com.StruckCroissant.GameDB.core.user.UserDao;
import com.StruckCroissant.GameDB.security.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

  private final UserDao userDao;

  private final BCryptPasswordEncoder passwordEncoder;

  @Autowired
  public LoginService(@Qualifier("db-user") UserDao userDao, BCryptPasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
    this.userDao = userDao;
  }

  public boolean login(UserLoginRequest request) {
    User user =
        userDao
            .selectUserByUsername(request.getUsername())
            .orElseThrow(
                () -> {
                  throw new UsernameNotFoundException(
                      String.format("user with username %s not found", request.getUsername()));
                });
    return passwordEncoder.matches(request.getPassword(), user.getPassword());
  }
}
