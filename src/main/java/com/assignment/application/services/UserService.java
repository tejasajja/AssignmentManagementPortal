package com.assignment.application.services;

import com.assignment.application.domain.UserInfoDetails;
import com.assignment.application.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserInfoRepository repository;
    public Optional<UserInfoDetails> findByUsername(String username){
        return repository.findByName(username);
    }
}
