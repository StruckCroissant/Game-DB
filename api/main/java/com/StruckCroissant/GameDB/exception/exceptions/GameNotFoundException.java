package com.StruckCroissant.GameDB.exception.exceptions;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * This exception class provides a subset of the ResourceNotFoundException for handling missing
 * games.
 *
 * @author Dakota Vaughn
 * @see ResourceNotFoundException
 * @since 2022-06-20
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Requested game not found")
public class GameNotFoundException extends ResourceNotFoundException {

  private final String message;

  public GameNotFoundException(String message) {
    super(message);
    this.message = message;
  }
}
