package com.assignment.application.repository;

import com.assignment.application.Entity.UserInfo;
import com.assignment.application.domain.UserInfoDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfoDetails, Long> {
    Optional<UserInfoDetails> findByName(String username);
}