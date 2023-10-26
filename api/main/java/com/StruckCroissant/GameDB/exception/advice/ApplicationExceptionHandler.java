package com.StruckCroissant.GameDB.exception.advice;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {

  @ResponseStatus(value=HttpStatus.UNAUTHORIZED)
  @ExceptionHandler(UsernameNotFoundException.class)
  @ResponseBody
  public Map<String, Object> handleUserLoginFailure(
      UsernameNotFoundException usernameNotFoundException
  ) {
    String body = "Username or password is incorrect";

    Map<String, Object> error = new HashMap<>();
    error.put("message", body);

    List<Object> errors = new ArrayList<>();
    errors.add(error);

    Map<String, Object> result = new HashMap<>();
    result.put("errors", errors);

    return result;
  }
}
