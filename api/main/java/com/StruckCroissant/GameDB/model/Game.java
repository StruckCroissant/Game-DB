package com.StruckCroissant.GameDB.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;

public class Game implements DbModelObj{

    @NotBlank
    private final int gid;

    @NotBlank
    private final String gname;

    private final String cost;

    private final String discounted_cost;

    @NotBlank
    private final String url;

    private final String age_rating;

    private final int indie;

    private final String description;

    private final String release_date;

    @NotBlank
    private final float rawgId;

    public Game(@JsonProperty("gid") int gid, @JsonProperty("gname") String gname,
                @JsonProperty("cost") String cost, @JsonProperty("discounted_cost") String discounted_cost,
                @JsonProperty("url") String url, @JsonProperty("age_rating") String age_rating,
                @JsonProperty("indie") int indie, @JsonProperty("description") String description,
                @JsonProperty("release_date") String release_date, @JsonProperty("rawgId") float rawgId) {
        this.gid = gid;
        this.gname = gname;
        this.cost = cost;
        this.discounted_cost = discounted_cost;
        this.url = url;
        this.age_rating = age_rating;
        this.indie = indie;
        this.description = description;
        this.release_date = release_date;
        this.rawgId = rawgId;
    }

    public int getGid() {
        return gid;
    }

    public String getGname() {
        return gname;
    }

    public String getCost() {
        return cost;
    }

    public String getDiscounted_cost() {
        return discounted_cost;
    }

    public String getUrl() {
        return url;
    }

    public String getAge_rating() {
        return age_rating;
    }

    public String getDescription() {
        return description;
    }

    public String getRelease_date() {
        return release_date;
    }

    public float getRawgId() {
        return rawgId;
    }

    @Override
    public String toString() {
        return "Game{" +
                "gid=" + gid +
                ", gname='" + gname + '\'' +
                ", cost='" + cost + '\'' +
                ", discounted_cost='" + discounted_cost + '\'' +
                ", url='" + url + '\'' +
                ", age_rating=" + age_rating +
                ", description='" + description + '\'' +
                ", release_date='" + release_date + '\'' +
                ", rawgId=" + rawgId +
                '}';
    }
}
