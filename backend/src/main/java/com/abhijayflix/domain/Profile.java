package com.abhijayflix.domain;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String brandName;
    private String title;

    @Convert(converter = StringListConverter.class)
    @Column(name = "introduction")
    private List<String> introduction;

    private String aboutTitle;

    @Convert(converter = StringListConverter.class)
    @Column(name = "about_text")
    private List<String> aboutText;

    private String email;
    private String phone;
    private String linkedinUrl;
    private String githubUrl;
    private String resumeUrl;
    private String imageUrl;

    public Long getId() { return id; }
    public String getFullName() { return fullName; }
    public String getBrandName() { return brandName; }
    public String getTitle() { return title; }
    public List<String> getIntroduction() { return introduction; }
    public String getAboutTitle() { return aboutTitle; }
    public List<String> getAboutText() { return aboutText; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getLinkedinUrl() { return linkedinUrl; }
    public String getGithubUrl() { return githubUrl; }
    public String getResumeUrl() { return resumeUrl; }
    public String getImageUrl() { return imageUrl; }

    public void setEmail(String email) { this.email = email; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
