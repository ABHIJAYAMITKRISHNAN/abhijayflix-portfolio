package com.abhijayflix.web;

import com.abhijayflix.service.PortfolioService;
import com.abhijayflix.web.dto.Dtos.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PortfolioController {

    private final PortfolioService service;

    public PortfolioController(PortfolioService service) {
        this.service = service;
    }

    @GetMapping("/portfolio")
    public PortfolioDto portfolio() {
        return service.portfolio();
    }

    @GetMapping("/profile")
    public ProfileDto profile() {
        return service.profile();
    }

    @GetMapping("/projects")
    public List<ProjectSummaryDto> projects() {
        return service.projects();
    }

    @GetMapping("/projects/{slug}")
    public ProjectDetailDto project(@PathVariable String slug) {
        return service.project(slug);
    }

    @GetMapping("/experiences")
    public List<ExperienceDto> experiences() {
        return service.experiences();
    }

    @GetMapping("/skills")
    public List<SkillCategoryDto> skills() {
        return service.skills();
    }

    @GetMapping("/education")
    public List<EducationDto> education() {
        return service.education();
    }

    @GetMapping("/certifications")
    public List<CertificationDto> certifications() {
        return service.certifications();
    }
}
