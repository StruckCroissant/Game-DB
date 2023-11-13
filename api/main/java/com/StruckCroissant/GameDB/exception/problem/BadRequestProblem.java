package com.StruckCroissant.GameDB.exception.problem;

import java.util.ArrayList;
import java.util.HashMap;

import java.util.Map;

public class BadRequestProblem extends ProblemAdapter {
  protected ArrayList<Object> errors = new ArrayList<>();
  private static final String TYPE = "Bad Request";
  private static final String TITLE = "Bad Request";
  private static final String MESSAGE = "The request failed due to bad parameters. Please try again";
  private static final int STATUS = 400;

  protected BadRequestProblem(
      String type
  ) {
    super(type, TITLE, STATUS, MESSAGE);
  }
  public ArrayList<Object> getErrors() {
    return errors;
  }

  protected void addNewError(Map<String, Object> error) {
    this.errors.add(error);
  }

  public void addNewMessageError(String message) {
    Map<String, Object> error = new HashMap<>();
    error.put("message", message);

    this.addNewError(error);
  }
}
