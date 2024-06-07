package com.StruckCroissant.GameDB.core.web.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public final class PaginationDetails {
  private final int page;

  private final int size;

  private final int totalPages;

  public PaginationDetails(
      int page,
      int size,
      int totalPages
  ) {
    this.page = page;
    this.size = size;
    this.totalPages = totalPages;
  }

  @JsonProperty("page")
  public int getPage() {
    return page;
  }

  @JsonProperty("size")
  public int getPageSize() {
    return size;
  }

  @JsonProperty("totalPages")
  public int getTotalPages() {
    return totalPages;
  }
}
