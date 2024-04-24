package com.StruckCroissant.GameDB.config.problem;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.zalando.problem.ProblemModule;
import org.zalando.problem.validation.ConstraintViolationProblemModule;

@Configuration
@EnableAutoConfiguration(exclude = ErrorMvcAutoConfiguration.class)
public class ProblemConfiguration implements InitializingBean {
  private final ObjectMapper objectMapper;

  public ProblemConfiguration(@Autowired ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  @Override
  public void afterPropertiesSet() {
    objectMapper.registerModules(
        ProblemConfiguration.getProblemMapper(), new ConstraintViolationProblemModule());
  }

  private static ProblemModule getProblemMapper() {
    return new ProblemModule().withStackTraces(false);
  }
}
