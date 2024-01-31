package com.StruckCroissant.GameDB.registration;

import com.StruckCroissant.GameDB.core.user.User;
import com.StruckCroissant.GameDB.core.user.UserRoleEnum;
import com.StruckCroissant.GameDB.core.user.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  private final UserService userService;

  RegistrationService(BCryptPasswordEncoder bCryptPasswordEncoder, UserService userService) {
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    this.userService = userService;
  }

  public boolean registerUser(UserRegistrationRequest request) {
    // Prompts user service to sign up the user
    return userService.signUpUser(
        new User(request.getUsername(), request.getPassword(), UserRoleEnum.USER, false, true));
  }
}
