package com.assignment.application.domain;


import com.assignment.application.Entity.UserInfo;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Assignment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Getter
    @Setter
    private Integer number;
    private String status;
    private String githubUrl;
    private String branch;
    private String codeReviewVideoUrl;
    @ManyToOne(optional = false)
    private UserInfoDetails user;


    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public UserInfoDetails getCodeReviewer() {
        return codeReviewer;
    }

    public void setCodeReviewer(UserInfoDetails codeReviewer) {
        this.codeReviewer = codeReviewer;
    }

    @ManyToOne
    private UserInfoDetails codeReviewer;

    //	private User assignedTo; TODO: assign it later
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getGithubUrl() {
        return githubUrl;
    }
    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }
    public String getBranch() {
        return branch;
    }
    public void setBranch(String branch) {
        this.branch = branch;
    }
    public String getCodeReviewVideoUrl() {
        return codeReviewVideoUrl;
    }
    public void setCodeReviewVideoUrl(String codeReviewVideoUrl) {
        this.codeReviewVideoUrl = codeReviewVideoUrl;
    }
    public UserInfoDetails getUser() {
        return user;
    }
    public void setUser(UserInfoDetails user) {
        this.user = user;
    }






}
