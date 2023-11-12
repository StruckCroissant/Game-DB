package com.StruckCroissant.GameDB.exception.problem;

import java.util.HashMap;
import java.util.Map;

public class ValidationProblem extends BadRequestProblem {
  public ValidationProblem() {
    super("Validation", 400);
  }

  public void addNewInvalidParam(String message, String property, String invalidValue) {
    Map<String, Object> error = this.createNewError(message, property, invalidValue);
    this.addNewError(error);
  }

  private Map<String, Object> createNewError(String message, String property, String invalidValue) {
    Map<String, Object> error = new HashMap<>();
    error.put("message", message);
    error.put("property", property);
    error.put("invalid", invalidValue);

    return error;
  }
}
