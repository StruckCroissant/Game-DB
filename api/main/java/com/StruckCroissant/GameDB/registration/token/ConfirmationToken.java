package com.StruckCroissant.GameDB.registration.token;

import com.StruckCroissant.GameDB.objects.user.User;
import java.time.LocalDateTime;

public class ConfirmationToken {
  private final String token;

  private final LocalDateTime createdAt;

  private final LocalDateTime expiresAt;

  private LocalDateTime confirmedAt;

  public ConfirmationToken(
      String token, LocalDateTime createdAt, LocalDateTime expiresAt, User user) {
    this.token = token;
    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
  }
}
