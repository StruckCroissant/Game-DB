package com.StruckCroissant.GameDB.core.web.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.domain.Page;

import java.util.List;

public class PageCustomFormat<T> {
  protected Page<T> page;

  public PageCustomFormat(Page<T> page) {
    this.page = page;
  }

  @JsonProperty("content")
  public List<T> getContent() {
    return this.page.getContent();
  }

  @JsonProperty("pagination")
  public PaginationDetails getPaginationDetails() {
    return new PaginationDetails(
        this.page.getNumber(),
        this.page.getNumberOfElements(),
        this.page.getTotalPages()
    );
  }
}
