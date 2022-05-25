package com.StruckCroissant.GameDB.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameDbTestController {

    @RequestMapping("/")
    public String testPage(){
        return "Test successful!";
    }
}
