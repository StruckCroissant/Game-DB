package com.StruckCroissant.GameDB.objects.game;

import com.StruckCroissant.GameDB.objects.DbModelObj;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;

/**
 * Provides a game db object for completing transactions within the API.
 *
 * @author Dakota
 * @since 2022-06-20
 */
public class Game implements DbModelObj {
  @NotBlank
  private final int gid;

  @NotBlank
  private final String gname;

  private final String cost;

  private final String discountedCost;

  @NotBlank
  private final String url;

  private final String age_rating;

  private final int indie;

  private final String description;

  private final String release_date;

  @NotBlank
  private final float rawgId;

  /**
   * Constructor creates a new game object from parameters
   *
   * @param gid            game id
   * @param gname          game name
   * @param cost           game cost
   * @param discountedCost game discounted cost
   * @param url            game url
   * @param ageRating      game age rating
   * @param indie          game indie status (T/F)
   * @param description    game description
   * @param releaseDate    game release date
   * @param rawgId         game rawg ID
   */
  public Game(
      @JsonProperty("gid") int gid,
      @JsonProperty("gname") String gname,
      @JsonProperty("cost") String cost,
      @JsonProperty("discountedCost") String discountedCost,
      @JsonProperty("url") String url,
      @JsonProperty("ageRating") String ageRating,
      @JsonProperty("indie") int indie,
      @JsonProperty("description") String description,
      @JsonProperty("releaseDate") String releaseDate,
      @JsonProperty("rawgId") float rawgId) {
    this.gid = gid;
    this.gname = gname;
    this.cost = cost;
    this.discountedCost = discountedCost;
    this.url = url;
    this.age_rating = ageRating;
    this.indie = indie;
    this.description = description;
    this.release_date = releaseDate;
    this.rawgId = rawgId;
  }

  /**
   * returns id
   *
   * @return int id
   */
  public int getGid() {
    return gid;
  }

  /**
   * returns name
   *
   * @return String gname
   */
  public String getGname() {
    return gname;
  }

  /**
   * returns cost
   *
   * @return String cost
   */
  public String getCost() {
    return cost;
  }

  /**
   * returns discounted cost
   *
   * @return String discountedCost
   */
  public String getDiscountedCost() {
    return discountedCost;
  }

  /**
   * returns url
   *
   * @return String url
   */
  public String getUrl() {
    return url;
  }

  /**
   * returns age rating
   *
   * @return String age_rating
   */
  public String getAge_rating() {
    return age_rating;
  }

  /**
   * returns game description
   *
   * @return String description
   */
  public String getDescription() {
    return description;
  }

  /**
   * returns release date
   *
   * @return String releaseDate
   */
  public String getReleaseDate() {
    return release_date;
  }

  /**
   * returns rawg id
   *
   * @return float rawgId
   */
  public float getRawgId() {
    return rawgId;
  }

  /**
   * returns object toString printout
   *
   * @return String
   */
  @Override
  public String toString() {
    return "Game{"
        + "gid="
        + gid
        + ", gname='"
        + gname
        + '\''
        + ", cost='"
        + cost
        + '\''
        + ", discountedCost='"
        + discountedCost
        + '\''
        + ", url='"
        + url
        + '\''
        + ", age_rating="
        + age_rating
        + ", description='"
        + description
        + '\''
        + ", release_date='"
        + release_date
        + '\''
        + ", rawgId="
        + rawgId
        + '}';
  }
}
