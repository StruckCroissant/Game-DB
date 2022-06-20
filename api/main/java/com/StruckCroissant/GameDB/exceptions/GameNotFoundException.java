package com.StruckCroissant.GameDB.exceptions;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;

public class GameNotFoundException extends ResourceNotFoundException {

  public GameNotFoundException(String message) {
    super(message);
  }
}
