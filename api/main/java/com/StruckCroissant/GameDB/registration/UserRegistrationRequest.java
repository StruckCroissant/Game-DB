package com.StruckCroissant.GameDB.registration;

import javax.validation.constraints.NotNull;

public class UserRegistrationRequest {

  @NotNull
  private final String username;

  @NotNull
  private final String password;

  public UserRegistrationRequest(String username, String password) {
    this.username = username;
    this.password = password;
  }

  public String getUsername() {
    return username;
  }

  public String getPassword() {
    return password;
  }

  @Override
  public String toString() {
    return "UserRegistrationRequest{"
        + "username='"
        + username
        + '\''
        + ", password='"
        + password
        + '\''
        + '}';
  }
}
