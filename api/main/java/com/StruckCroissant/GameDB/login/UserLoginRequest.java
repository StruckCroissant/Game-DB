package com.StruckCroissant.GameDB.login;

import java.util.Objects;
import javax.validation.constraints.NotBlank;

public class UserLoginRequest {

  @NotBlank private final String username;

  @NotBlank private final String password;

  public UserLoginRequest(String username, String password) {
    this.username = username;
    this.password = password;
  }

  public String getUsername() {
    return this.username;
  }

  public String getPassword() {
    return this.password;
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

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof UserLoginRequest)) return false;
    UserLoginRequest that = (UserLoginRequest) o;
    return username.equals(that.username) && password.equals(that.password);
  }

  @Override
  public int hashCode() {
    return Objects.hash(username, password);
  }
}
