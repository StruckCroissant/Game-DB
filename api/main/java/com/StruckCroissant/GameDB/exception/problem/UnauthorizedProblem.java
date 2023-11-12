package com.StruckCroissant.GameDB.exception.problem;

public class UnauthorizedProblem extends ProblemAdapter {
  private static final String TYPE = "Unauthorized";
  private static final String TITLE = "Unauthorized";
  private static final String MESSAGE = "Username or Password is incorrect";
  private static final int STATUS = 401;

  public UnauthorizedProblem() {
    super(TYPE, TITLE, STATUS, MESSAGE);
  }
}
