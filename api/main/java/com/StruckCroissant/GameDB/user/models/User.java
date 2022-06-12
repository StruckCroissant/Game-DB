package com.StruckCroissant.GameDB.user.models;

import com.StruckCroissant.GameDB.models_generic.DbModelObj;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import javax.validation.constraints.NotBlank;

public class User implements DbModelObj, UserDetails {
    private final Integer uid;
    @NotBlank
    private final String username;

    @NotBlank
    private String password;

    @NotBlank
    private final String email;

    private UserRoleEnum userRole;
    private Boolean locked;

    private Boolean enabled;

    public User(@JsonProperty("id") int id,
                @JsonProperty("username") String username,
                @JsonProperty("password") String password,
                @JsonProperty("email") String email,
                @JsonProperty("role") UserRoleEnum role,
                @JsonProperty("locked") Boolean locked,
                @JsonProperty("enabled") Boolean enabled) {
        this.uid = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.userRole = role;
        this.locked = locked;
        this.enabled = enabled;
    }

    public User(@JsonProperty("username") String username,
                @JsonProperty("password") String password,
                @JsonProperty("email") String email,
                @JsonProperty("role") UserRoleEnum role,
                @JsonProperty("locked") Boolean locked,
                @JsonProperty("enabled") Boolean enabled) {
        this.uid = null;
        this.username = username;
        this.password = password;
        this.email = email;
        this.userRole = role;
        this.locked = locked;
        this.enabled = enabled;
    }

    public Optional<Integer> getId() {
        return Optional.ofNullable(this.uid);
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return this.email;
    }

    public UserRoleEnum getRole() {
        return this.userRole;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority(userRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + this.uid +
                ", username='" + this.username + '\'' +
                '}';
    }

    public void setPassword(String encodedPassword) {
        this.password = encodedPassword;
    }
}
