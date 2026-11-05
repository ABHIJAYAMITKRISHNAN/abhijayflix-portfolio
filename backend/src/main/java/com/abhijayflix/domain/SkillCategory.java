package com.abhijayflix.domain;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "skill_category")
public class SkillCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String slug;
    private String name;

    @Convert(converter = StringListConverter.class)
    private List<String> skills;

    private int position;

    public String getSlug() { return slug; }
    public String getName() { return name; }
    public List<String> getSkills() { return skills; }
    public int getPosition() { return position; }
}
