package com.assignment.application.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Setter;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentEnum {
    ASSIGNMENT_1(1, "HTML"),
    ASSIGNMENT_2(2,"Gussing Game"),
    ASSIGNMENT_3(3,"Userlogin"),
    ASSIGNMENT_4(4,"Students Course List "),
    ASSIGNMENT_5(5, " Custom Array List"),
    ASSIGNMENT_6(6, " Some assignment 6"),
    ASSIGNMENT_7(7," Some assignment 7"),
    ASSIGNMENT_8(8," Some assignment 8"),
    ASSIGNMENT_9(9," Some assignment 9"),
    ASSIGNMENT_10(10," Some assignment 10"),
    ASSIGNMENT_11 (11, " Some assignment 11"),
    ASSIGNMENT_12(12," Some assignment 12"),
    ASSIGNMENT_13(13," Some assignment 13"),
    ASSIGNMENT_14(14," Some assignment 14");

    private int assignmentNum;
    @Setter
    private String assName;

    public String getassName() {
        return assName;
    }

    AssignmentEnum (int assignmentNum, String s){
        this.assignmentNum = assignmentNum;
        this.assName= s;
    }

    public int getAssignmentNum() {
        return assignmentNum;
    }
}
