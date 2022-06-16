package com.StruckCroissant.GameDB.registration;

import com.StruckCroissant.GameDB.objects.user.User;
import com.StruckCroissant.GameDB.objects.user.UserRoleEnum;
import com.StruckCroissant.GameDB.objects.user.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

  private final EmailValidator emailValidator;

  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  private final UserService userService;

  RegistrationService(
      EmailValidator emailValidator,
      BCryptPasswordEncoder bCryptPasswordEncoder,
      UserService userService) {
    this.emailValidator = emailValidator;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    this.userService = userService;
  }

  public String registerUser(UserRegistrationRequest request) {
    boolean isValidEmail = emailValidator.test(request.getEmail());
    if (!isValidEmail) {
      throw new IllegalStateException("email not valid");
    }

    // Prompts user service to sign up the user & returns token if successful
    String token =
        userService.signUpUser(
            new User(
                request.getUsername(),
                request.getPassword(),
                request.getEmail(),
                UserRoleEnum.USER,
                false,
                true));

    return token;
  }
}
