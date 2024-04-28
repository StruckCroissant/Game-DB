package com.StruckCroissant.GameDB.core;

import java.util.ArrayList;
import java.util.List;
import org.jetbrains.annotations.Nullable;

public class SimpleQueryBuilder {
  private final List<String> select = new ArrayList<>();
  private final List<String> from = new ArrayList<>();
  private final List<String> where = new ArrayList<>();
  private final List<String> groupBy = new ArrayList<>();
  private final List<String> orderBy = new ArrayList<>();
  @Nullable private Integer limit = null;

  public SimpleQueryBuilder addSelect(String statement) {
    this.select.add(statement);
    return this;
  }

  public SimpleQueryBuilder addFrom(String statement) {
    this.from.add(statement);
    return this;
  }

  public SimpleQueryBuilder addWhere(String statement) {
    this.where.add(statement);
    return this;
  }

  public SimpleQueryBuilder addGroupBy(String statement) {
    this.groupBy.add(statement);
    return this;
  }

  public SimpleQueryBuilder addOrderBy(String statement) {
    this.orderBy.add(statement);
    return this;
  }

  public SimpleQueryBuilder setLimit(int limit) {
    this.limit = limit;
    return this;
  }

  @Override
  public String toString() {
    StringBuilder stringBuilder = new StringBuilder();

    if (!this.select.isEmpty()) {
      stringBuilder.append("SELECT ").append(String.join(",", this.select));
    }
    if (!this.from.isEmpty()) {
      stringBuilder.append(" FROM ").append(String.join(" ", this.from));
    }
    if (!this.where.isEmpty()) {
      stringBuilder.append(" WHERE ").append(String.join(" ", this.where));
    }
    if (!this.groupBy.isEmpty()) {
      stringBuilder.append(" GROUP BY ").append(String.join(",", this.groupBy));
    }
    if (!this.orderBy.isEmpty()) {
      stringBuilder.append(" ORDER BY ").append(String.join(",", this.groupBy));
    }
    if (this.limit != null) {
      stringBuilder.append(String.format("LIMIT %s", this.limit));
    }

    stringBuilder.append(";");

    return stringBuilder.toString();
  }
}
