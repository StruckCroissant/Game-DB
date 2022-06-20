package com.StruckCroissant.GameDB.registration;

import com.StruckCroissant.GameDB.objects.user.User;
import com.StruckCroissant.GameDB.objects.user.UserRoleEnum;
import com.StruckCroissant.GameDB.objects.user.UserService;
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

  public String registerUser(UserRegistrationRequest request) {

    // Prompts user service to sign up the user & returns token if successful
    String token =
        userService.signUpUser(
            new User(request.getUsername(), request.getPassword(), UserRoleEnum.USER, false, true));

    return token;
  }
}
