package com.StruckCroissant.GameDB.registration;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200") // Replace with proxy
@RequestMapping("/api/v1/")
@RestController
public class RegistrationController {

  private final RegistrationService registrationService;

  public RegistrationController(RegistrationService registrationService) {
    this.registrationService = registrationService;
  }

  @PostMapping("/register")
  @ResponseStatus(HttpStatus.OK)
  public boolean registerUser(@RequestBody UserRegistrationRequest request) {
    return registrationService.registerUser(request);
  }
}
