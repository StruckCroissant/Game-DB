package com.StruckCroissant.GameDB.registration;

import java.util.function.Predicate;
import java.util.regex.Pattern;
import org.springframework.stereotype.Service;

@Service
public class EmailValidator implements Predicate<String> {
  private final String MATCH_EMAIL = "(\\w|\\d)+@\\w+\\.\\w+";

  @Override
  public boolean test(String email) {
    return Pattern.compile(MATCH_EMAIL).matcher(email).find();
  }
}
