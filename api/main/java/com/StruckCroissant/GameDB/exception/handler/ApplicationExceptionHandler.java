package com.StruckCroissant.GameDB.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApplicationExceptionHandler {

  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ExceptionHandler(UsernameNotFoundException.class)
  public String handleUserLoginFailure(UsernameNotFoundException usernameNotFoundException) {
    return usernameNotFoundException.getMessage();
  }
}
