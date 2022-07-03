package com.StruckCroissant.GameDB.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200") // Replace with proxy later
@RequestMapping("/api/v1/")
@RestController
public class LoginController {

  public LoginService loginService;

  @Autowired
  public LoginController(LoginService loginService) {
    this.loginService = loginService;
  }

  @PostMapping("/login")
  public boolean login(@RequestBody UserLoginRequest request) {
    return loginService.login(request);
  }
}
