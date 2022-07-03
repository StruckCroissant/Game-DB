package com.StruckCroissant.GameDB;

import java.util.Arrays;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * GameDbApplication is the entrance point to the Spring-Boot API. Contains a cors filter to
 * facilitate communication with the front-end @Author Dakota Vaughn
 *
 * @since 2022-06-20
 */
@SpringBootApplication
@RestController
public class GameDbApplication {
  public static void main(String[] args) {
    SpringApplication.run(GameDbApplication.class, args);
  }
}
