package com.assignment.application.Entity;

import com.assignment.application.domain.Assignment;
import com.assignment.application.enums.AssignmentEnum;
import com.assignment.application.enums.AssignmentStatusEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AssignmentResponseDto {


    @Setter
    @Getter
    private Assignment assignment;


//    private List <AssignmentEnumDto> assigmentEnums= new ArrayList<>();
    @Getter
    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();

    @Getter
    private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();
    public AssignmentResponseDto(Assignment assignment) {
        super();
        this.assignment = assignment;
    }

}
