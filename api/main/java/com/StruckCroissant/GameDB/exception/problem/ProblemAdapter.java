package com.StruckCroissant.GameDB.exception.problem;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public abstract class ProblemAdapter {
  protected String type = "about:blank";
  protected String title = "encountered an error";
  protected String message = "encountered an error";
  protected Integer status = 500;
  private final ObjectMapper objectMapper = new ObjectMapper();

  protected ProblemAdapter(String type, String title, Integer status, String message) {
    this.type = type;
    this.title = title;
    this.status = status;
    this.message = message;
  }

  protected ProblemAdapter() {}

  public String getType() {
    return this.type;
  }

  public String getTitle() {
    return this.title;
  }

  public Integer getStatus() {
    return status;
  }

  public String getMessage() {
    return this.message;
  }

  public String serialize() throws JsonProcessingException {
    return objectMapper.writeValueAsString(this);
  }

  public ProblemAdapter deserialize(String json) throws JsonProcessingException {
    return objectMapper.readValue(json, this.getClass());
  }
}
