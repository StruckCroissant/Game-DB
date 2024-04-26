package com.StruckCroissant.GameDB;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.web.bind.annotation.RestController;

/**
 * GameDbApplication is the entrance point to the Spring-Boot API. Contains a cors filter to
 * facilitate communication with the front-end @Author Dakota Vaughn
 *
 * @since 2022-06-20
 */
@SpringBootApplication(exclude = {ErrorMvcAutoConfiguration.class})
@RestController
public class GameDbApplication {
  public static void main(String[] args) {
    SpringApplication.run(GameDbApplication.class, args);
  }
}
