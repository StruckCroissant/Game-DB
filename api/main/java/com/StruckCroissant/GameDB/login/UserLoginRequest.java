package com.StruckCroissant.GameDB.login;

public class UserLoginRequest {

  private final String username;

  private final String password;

  public UserLoginRequest(String username, String password) {
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
    return "UserLoginRequest{"
        + "username='"
        + username
        + '\''
        + ", password='"
        + password
        + '\''
        + '}';
  }
}
