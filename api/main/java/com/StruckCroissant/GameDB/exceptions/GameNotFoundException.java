package com.StruckCroissant.GameDB.exceptions;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;

/**
 * This exception class provides a subset of the ResourceNotFoundException
 * for handling missing games.
 * @see ResourceNotFoundException
 * @author Dakota Vaughn
 * @since 2022-06-20
 */
public class GameNotFoundException extends ResourceNotFoundException {
    public GameNotFoundException(String message){
        super(message);
    }
}
