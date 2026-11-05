package com.abhijayflix.domain;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "project_section")
public class ProjectSection {

    public enum Kind { TEXT, LIST, FLOW }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id")
    private Project project;

    private int position;
    private String heading;

    @Enumerated(EnumType.STRING)
    private Kind kind;

    private String body;

    @Convert(converter = StringListConverter.class)
    private List<String> items;

    public int getPosition() { return position; }
    public String getHeading() { return heading; }
    public Kind getKind() { return kind; }
    public String getBody() { return body; }
    public List<String> getItems() { return items; }
}
