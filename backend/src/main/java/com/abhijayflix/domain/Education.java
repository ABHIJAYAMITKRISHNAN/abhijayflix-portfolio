package com.abhijayflix.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String degree;
    private String branch;
    private String institution;
    private String expectedGraduation;
    private int position;

    public String getDegree() { return degree; }
    public String getBranch() { return branch; }
    public String getInstitution() { return institution; }
    public String getExpectedGraduation() { return expectedGraduation; }
    public int getPosition() { return position; }
}
