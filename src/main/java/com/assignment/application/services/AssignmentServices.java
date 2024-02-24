package com.assignment.application.services;
import com.assignment.application.Entity.UserInfo;
import com.assignment.application.domain.Assignment;
import com.assignment.application.domain.UserInfoDetails;
import com.assignment.application.enums.AssignmentStatusEnum;
import com.assignment.application.enums.AuthorityEnum;
import com.assignment.application.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentServices {
//
//    @Autowired
    @Autowired
    private AssignmentRepository assigmentRepo;

    public Assignment save(UserInfoDetails user) {
        Assignment assignment = new Assignment();
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        assignment.setNumber(findNextAssignmentToSubmit(user));
        assignment.setUser(user);
        return assigmentRepo.save(assignment);
    }

    private Integer findNextAssignmentToSubmit(UserInfoDetails user) {
        Set<Assignment> assignmentsByUser= assigmentRepo.findByUser(user);

        if (assignmentsByUser ==null){
            return 1;
        }
        Optional <Integer> nextAssignmentNumOpt = assignmentsByUser.stream()
                .sorted((a1,a2)->{
            if (a1.getNumber() == null)
                return 1;
            if (a2.getNumber()==null)
                return 1;
            return a2.getNumber().compareTo(a1.getNumber());
        }).map(assignment -> {
            if(assignment.getNumber()==null)
                return 1;
            return assignment.getNumber() +1;
        }).findFirst();
        return nextAssignmentNumOpt.orElse(1);
    }

    public Set <Assignment> findByUser(UserInfoDetails user) {

        boolean ReviewerRole =user.getAuthorities()
                .stream()
                .filter(auth-> AuthorityEnum.ROLE_REVIEWER.name().equals(auth.getAuthority())).count()> 0 ;

        if (ReviewerRole){
            return assigmentRepo.findByReviewer(user);
        }
        else{
            return assigmentRepo.findByUser(user);
        }

    }

    public Optional<Assignment> findById(Long assignmentId) {
        return assigmentRepo.findById(assignmentId);
    }

    public Assignment save(Assignment assignment){
        return assigmentRepo.save(assignment);
    }

}

