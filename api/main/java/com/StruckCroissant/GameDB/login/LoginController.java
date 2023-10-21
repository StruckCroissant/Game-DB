package com.StruckCroissant.GameDB.login;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*") // Replace with proxy later
@RequestMapping
@RestController
public class LoginController {

  private final LoginService loginService;

  @Autowired
  public LoginController(LoginService loginService) {
    this.loginService = loginService;
  }

  @PostMapping("/login")
  public boolean login(@RequestBody @Valid UserLoginRequest request) {
    return this.loginService.login(request);
  }
}
