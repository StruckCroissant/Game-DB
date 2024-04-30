package com.StruckCroissant.GameDB.core.game;

import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class GameSearchRequestValidator implements ConstraintValidator<GameSearchRequestIsValid, GameSearchRequest> {
  @Override
  public boolean isValid(GameSearchRequest request, ConstraintValidatorContext context) {
    return request.name() != null || request.id() != null;
  }
}
