package com.abhijayflix.domain;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String slug;
    private String title;
    private String shortTitle;

    @Column(name = "project_year")
    private Integer year;

    @Convert(converter = StringListConverter.class)
    private List<String> categories;

    @Convert(converter = StringListConverter.class)
    private List<String> techStack;

    private String tagline;
    private String summary;
    private String notes;
    private String posterVariant;
    private String accentColor;
    private String githubUrl;
    private String demoUrl;
    private int position;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("position ASC")
    private List<ProjectSection> sections = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("position ASC")
    private List<ProjectMetric> metrics = new ArrayList<>();

    public Long getId() { return id; }
    public String getSlug() { return slug; }
    public String getTitle() { return title; }
    public String getShortTitle() { return shortTitle; }
    public Integer getYear() { return year; }
    public List<String> getCategories() { return categories; }
    public List<String> getTechStack() { return techStack; }
    public String getTagline() { return tagline; }
    public String getSummary() { return summary; }
    public String getNotes() { return notes; }
    public String getPosterVariant() { return posterVariant; }
    public String getAccentColor() { return accentColor; }
    public String getGithubUrl() { return githubUrl; }
    public String getDemoUrl() { return demoUrl; }
    public int getPosition() { return position; }
    public List<ProjectSection> getSections() { return sections; }
    public List<ProjectMetric> getMetrics() { return metrics; }

    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public void setDemoUrl(String demoUrl) { this.demoUrl = demoUrl; }
}
