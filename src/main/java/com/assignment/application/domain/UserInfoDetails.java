package com.assignment.application.domain;

import com.assignment.application.Entity.UserInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;



@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDetails implements UserDetails {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Setter
    @JsonIgnore
    private String password;
    @Getter
    @Setter
    private LocalDate cohortStartDate;
    @OneToMany(fetch=FetchType.EAGER, mappedBy = "user")
    @JsonIgnore
    private List<Authority> authorities =  new ArrayList<>();

//    public UserInfoDetails(UserInfo userInfo) {
//        name = userInfo.getName();
//        password = userInfo.getPassword();
//        authorities = Arrays.stream(userInfo.getRoles().split(","))
//                .map(SimpleGrantedAuthority::new)
//                .collect(Collectors.toList());
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
//        List<GrantedAuthority> roles = new ArrayList<>();
//        roles.add(new Authority("ROLE_STUDENT"));
        return authorities;
    }

    public void setAuthorities(List<Authority> authorities) {
        this.authorities = authorities;
    }
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return authorities;
//    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}