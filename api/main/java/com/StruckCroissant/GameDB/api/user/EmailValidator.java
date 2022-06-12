package com.StruckCroissant.GameDB.api.user;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;
import java.util.regex.Pattern;

@Service
public class EmailValidator implements Predicate<String> {
    private final String MATCH_EMAIL =
            "(?:(\\w|\\d)+)@(?:\\w+)\\.(?:\\w+)";
    @Override
    public boolean test(String email) {
        return Pattern.compile(MATCH_EMAIL).matcher(email).find();
    }
}
