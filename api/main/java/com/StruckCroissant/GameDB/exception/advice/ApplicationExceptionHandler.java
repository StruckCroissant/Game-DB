package com.StruckCroissant.GameDB.exception.advice;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import com.StruckCroissant.GameDB.exception.problem.UnauthorizedProblem;

@RestControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {

  @ResponseStatus(value=HttpStatus.UNAUTHORIZED)
  @ExceptionHandler(AuthenticationException.class)
  @ResponseBody
  public String handleUserLoginFailure(
      AuthenticationException authenticationException
  ) throws JsonProcessingException {
    UnauthorizedProblem unauthorizedProblem = new UnauthorizedProblem();

    return unauthorizedProblem.serialize();
  }
}
