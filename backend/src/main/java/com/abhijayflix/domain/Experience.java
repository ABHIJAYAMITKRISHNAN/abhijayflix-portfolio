package com.abhijayflix.domain;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "experience")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String slug;
    private String company;
    private String role;
    private String duration;
    private String summary;

    @Convert(converter = StringListConverter.class)
    private List<String> techStack;

    @Convert(converter = StringListConverter.class)
    private List<String> responsibilities;

    @Convert(converter = StringListConverter.class)
    private List<String> highlights;

    private int position;

    public String getSlug() { return slug; }
    public String getCompany() { return company; }
    public String getRole() { return role; }
    public String getDuration() { return duration; }
    public String getSummary() { return summary; }
    public List<String> getTechStack() { return techStack; }
    public List<String> getResponsibilities() { return responsibilities; }
    public List<String> getHighlights() { return highlights; }
    public int getPosition() { return position; }
}
