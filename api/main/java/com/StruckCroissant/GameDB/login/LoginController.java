package com.StruckCroissant.GameDB.login;

import com.StruckCroissant.GameDB.core.user.UserService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("**") // Replace with proxy later
@RequestMapping
@RestController
public class LoginController {

  private final LoginService loginService;
  private final UserService userService;

  @Autowired
  public LoginController(LoginService loginService, UserService userService) {
    this.loginService = loginService;
    this.userService = userService;
  }

  @PostMapping("/login")
  public UserDetails login(@RequestBody @Valid UserLoginRequest request)
      throws BadCredentialsException {
    if (!this.loginService.login(request)) {
      throw new BadCredentialsException("Username or password is incorrect");
    }
    return this.userService.getUserByUsername(request.getUsername());
  }
}
