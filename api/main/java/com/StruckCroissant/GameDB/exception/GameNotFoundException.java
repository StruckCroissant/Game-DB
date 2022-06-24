package com.StruckCroissant.GameDB.exception;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * This exception class provides a subset of the ResourceNotFoundException
 * for handling missing games.
 * @see ResourceNotFoundException
 * @author Dakota Vaughn
 * @since 2022-06-20
 */

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Requested game not found")
public class GameNotFoundException extends RuntimeException {

    private final String message;

    public GameNotFoundException(String message) {
        super(message); // Neither message shows up in the http response?
        this.message = message;
    }
}
