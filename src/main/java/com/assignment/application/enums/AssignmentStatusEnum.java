package com.assignment.application.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentStatusEnum {


    PENDING_SUBMISSION("Pending Submission",1),
    SUBMISSION("Submitted",2),
    IN_REVIEW("In Review",3),
    NEED_UPDATE("NEED Update",4),
    COMPLETED( "Completed",5);



    @Getter
    @Setter
    private String status;

     AssignmentStatusEnum(String status, Integer step) {
        this.status = status;
        this.step = step;
    }

    @Getter
    @Setter
    private Integer step;



}
