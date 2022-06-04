package com.StruckCroissant.GameDB.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Optional;
import java.util.UUID;
import javax.validation.constraints.NotBlank;

public class User implements DbModelObj{

    private final Integer uid;
    @NotBlank
    private final String username;

    public User(@JsonProperty("id") int id,
                @JsonProperty("username") String username) {
        this.uid = id;
        this.username = username;
    }

    public User(@JsonProperty("username") String username) {
        this.uid = null;
        this.username = username;
    }

    public Integer getId() {
        return this.uid;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + this.uid +
                ", username='" + this.username + '\'' +
                '}';
    }
}
