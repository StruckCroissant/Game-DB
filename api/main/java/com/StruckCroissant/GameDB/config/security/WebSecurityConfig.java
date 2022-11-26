package com.StruckCroissant.GameDB.config.security;

import com.StruckCroissant.GameDB.core.user.UserService;
import com.StruckCroissant.GameDB.config.security.PasswordEncoder;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private final UserService userService;

  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  private final PasswordEncoder passwordEncoder;

  @Autowired
  public WebSecurityConfig(
      UserService userService,
      BCryptPasswordEncoder bCryptPasswordEncoder,
      PasswordEncoder passwordEncoder) {
    this.userService = userService;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    this.passwordEncoder = passwordEncoder;
  }

  // TODO make configure file for endpoint constants
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.cors()
        .and()
        .httpBasic()
        .and()
        .authorizeRequests()
        .antMatchers(HttpMethod.POST, "/api/v*/login", "/api/v*/register")
        .permitAll()
        .and()
        .authorizeRequests()
        .antMatchers(HttpMethod.GET, "/api/v*/user")
        .permitAll()
        .anyRequest()
        .authenticated()
        .and()
        .csrf()
        .disable();

    /*
    http.csrf()
        .disable()
        .authorizeRequests()
        .antMatchers("/api/v/user/**") add v* /
     .authenticated()
     .antMatchers("/api/v/register/**") add v* /
     .anonymous() // Difference between anonymous & permit all?
     .antMatchers("/api/v/login/**") add v* /
     .permitAll()
     .anyRequest()
     .authenticated()
     .and()
     .httpBasic();
     */
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication().withUser("user").password("{noop}password").roles("USER");
    auth.authenticationProvider(daoAuthenticationProvider());
  }

  @Bean
  public DaoAuthenticationProvider daoAuthenticationProvider() {
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    provider.setPasswordEncoder(bCryptPasswordEncoder);
    provider.setUserDetailsService(userService);
    return provider;
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    // corsConfiguration.setAllowCredentials(true);
    corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
    corsConfiguration.setAllowedHeaders(
        Arrays.asList(
            "Origin",
            "Access-Control-Allow-Origin",
            "Content-Type",
            "Accept",
            "Authorization",
            "Origin, Accept",
            "X-Requested-With",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers",
            "credentials"));
    corsConfiguration.setExposedHeaders(
        Arrays.asList(
            "Origin",
            "Content-Type",
            "Accept",
            "Authorization",
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Credentials",
            "x-auth-token"));
    corsConfiguration.setAllowedMethods(
        Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource =
        new UrlBasedCorsConfigurationSource();
    urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
    return urlBasedCorsConfigurationSource;
  }
}
