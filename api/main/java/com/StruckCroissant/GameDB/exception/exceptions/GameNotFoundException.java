package com.StruckCroissant.GameDB.exception.exceptions;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;

public class GameNotFoundException extends ResourceNotFoundException {
  public GameNotFoundException(int gameId) {
    super(String.format("The requested Game ID (%d) was not found", gameId));
  }
}
