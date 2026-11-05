package com.abhijayflix.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "project_metric")
public class ProjectMetric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id")
    private Project project;

    private int position;
    private String label;

    @Column(name = "metric_value")
    private String value;

    private String note;

    public int getPosition() { return position; }
    public String getLabel() { return label; }
    public String getValue() { return value; }
    public String getNote() { return note; }
}
