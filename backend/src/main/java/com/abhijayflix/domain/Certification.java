package com.abhijayflix.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "certification")
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String kind;
    private int position;

    public String getTitle() { return title; }
    public String getKind() { return kind; }
    public int getPosition() { return position; }
}
