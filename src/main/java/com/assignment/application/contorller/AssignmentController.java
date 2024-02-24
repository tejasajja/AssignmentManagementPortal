package com.assignment.application.contorller;
import com.assignment.application.Entity.AssignmentResponseDto;
//import com.assignment.application.domain.Assignment;
import com.assignment.application.domain.Assignment;
import com.assignment.application.domain.UserInfoDetails;
//import com.assignment.application.services.AssignmentServices;
//import com.assignment.application.services.AssignmentServices;
import com.assignment.application.enums.AuthorityEnum;
import com.assignment.application.services.AssignmentServices;
import com.assignment.application.services.UserInfoService;
import com.assignment.application.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;


//public record AssignmentClaim(int )

@RestController
@RequestMapping("/auth/assignment")
public class AssignmentController {

    @Autowired
    private AssignmentServices assignmentServices;
    @Autowired
    private UserInfoService userInfoService;
    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal UserInfoDetails userDetails) {
            Assignment newAssignment = assignmentServices.save(userDetails);
        return ResponseEntity.ok(newAssignment);
    }

    @GetMapping("")
    public ResponseEntity<?> getAssignment(@AuthenticationPrincipal UserInfoDetails userDetails){
        Set<Assignment> assignmentByUser = assignmentServices.findByUser(userDetails);
        return ResponseEntity.ok(assignmentByUser);
    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId,  @AuthenticationPrincipal UserInfoDetails userDetails){
        Optional<Assignment> assignmentOpt = assignmentServices.findById(assignmentId);
        AssignmentResponseDto response = new AssignmentResponseDto(assignmentOpt.orElse(new Assignment()));
        return ResponseEntity.ok(response);
    }

    public static Boolean hasRole(String role, UserInfoDetails user){
        return user.getAuthorities().stream().filter(auth->auth.getAuthority().equals(role)).count()>0;
    }

    @PutMapping("{assignmentId}")
    public ResponseEntity<?> UpdateAssignment(@PathVariable Long assignmentId, @RequestBody Assignment assignment,  @AuthenticationPrincipal UserInfoDetails userDetails){
        if (assignment.getCodeReviewer()!=null){
            UserInfoDetails codeReviewer = assignment.getCodeReviewer();
            codeReviewer= userService.findByUsername(codeReviewer.getUsername()).orElse(new UserInfoDetails());

            if (hasRole(AuthorityEnum.ROLE_REVIEWER.name(),codeReviewer)){
            assignment.setCodeReviewer(codeReviewer);
            }
        }
        Assignment updatedAssignment = assignmentServices.save(assignment);
        return ResponseEntity.ok(updatedAssignment);
    }
}
