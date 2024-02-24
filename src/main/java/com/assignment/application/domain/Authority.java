package com.assignment.application.domain;

import com.assignment.application.Entity.UserInfo;
import org.hibernate.annotations.ManyToAny;
import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "Authority")
public class Authority implements GrantedAuthority {
        /**
         *
         */
        private static final long serialVersionUID = 550035482055449943L;
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String Authority;
        @ManyToOne(optional = false)
        private UserInfoDetails user;

        public Authority() {}

        public Authority (String Authority) {
            this .Authority	= Authority;
        }


        public Long getId() {
            return id;
        }
        public void setId(Long id) {
            this.id = id;
        }
        @Override
        public String getAuthority() {
            return Authority;
        }
        public void setAuthority(String authority) {
            Authority = authority;
        }
        public UserInfoDetails getUser() {
            return user;
        }
        public void setUser(UserInfoDetails user) {
            this.user = user;
        }





    }

