package com.StruckCroissant.GameDB.registration;

import java.util.Objects;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class UserRegistrationRequest {

  @NotBlank private final String username;

  @NotBlank private final String password;

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

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    UserRegistrationRequest that = (UserRegistrationRequest) o;
    return username.equals(that.username) && password.equals(that.password);
  }

  @Override
  public int hashCode() {
    return Objects.hash(username, password);
  }
}
