package com.assignment.application.repository;


import com.assignment.application.domain.Assignment;
import com.assignment.application.domain.UserInfoDetails;
import com.assignment.application.enums.AssignmentStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
Set<Assignment> findByUser(UserInfoDetails userDetails);


    @Query(" select a from Assignment a "
            +"where a.status ='Submitted' "
            +"or a.codeReviewer = :codeReviewer")
    Set<Assignment> findByReviewer(UserInfoDetails codeReviewer);
}