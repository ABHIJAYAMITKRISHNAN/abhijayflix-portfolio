package com.abhijayflix.service;

import com.abhijayflix.domain.Profile;
import com.abhijayflix.domain.Project;
import com.abhijayflix.repository.*;
import com.abhijayflix.web.dto.Dtos.*;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class PortfolioService {

    private static final Sort BY_POSITION = Sort.by("position");

    private final ProfileRepository profiles;
    private final ProjectRepository projects;
    private final ExperienceRepository experiences;
    private final SkillCategoryRepository skills;
    private final EducationRepository education;
    private final CertificationRepository certifications;

    public PortfolioService(ProfileRepository profiles, ProjectRepository projects,
                            ExperienceRepository experiences, SkillCategoryRepository skills,
                            EducationRepository education, CertificationRepository certifications) {
        this.profiles = profiles;
        this.projects = projects;
        this.experiences = experiences;
        this.skills = skills;
        this.education = education;
        this.certifications = certifications;
    }

    public PortfolioDto portfolio() {
        return new PortfolioDto(profile(), projects(), experiences(), skills(), education(), certifications());
    }

    public ProfileDto profile() {
        return ProfileDto.from(loadProfile());
    }

    public List<ProjectSummaryDto> projects() {
        return projects.findAll(BY_POSITION).stream().map(ProjectSummaryDto::from).toList();
    }

    public ProjectDetailDto project(String slug) {
        return ProjectDetailDto.from(loadProject(slug));
    }

    public List<ExperienceDto> experiences() {
        return experiences.findAll(BY_POSITION).stream().map(ExperienceDto::from).toList();
    }

    public List<SkillCategoryDto> skills() {
        return skills.findAll(BY_POSITION).stream().map(SkillCategoryDto::from).toList();
    }

    public List<EducationDto> education() {
        return education.findAll(BY_POSITION).stream().map(EducationDto::from).toList();
    }

    public List<CertificationDto> certifications() {
        return certifications.findAll(BY_POSITION).stream().map(CertificationDto::from).toList();
    }

    @Transactional
    public ProfileDto updateProfileLinks(ProfileLinksUpdate update) {
        Profile p = loadProfile();
        if (update.email() != null) p.setEmail(blankToNull(update.email()));
        if (update.phone() != null) p.setPhone(blankToNull(update.phone()));
        if (update.linkedinUrl() != null) p.setLinkedinUrl(blankToNull(update.linkedinUrl()));
        if (update.githubUrl() != null) p.setGithubUrl(blankToNull(update.githubUrl()));
        if (update.resumeUrl() != null) p.setResumeUrl(blankToNull(update.resumeUrl()));
        if (update.imageUrl() != null) p.setImageUrl(blankToNull(update.imageUrl()));
        return ProfileDto.from(p);
    }

    @Transactional
    public ProjectDetailDto updateProjectLinks(String slug, ProjectLinksUpdate update) {
        Project p = loadProject(slug);
        if (update.githubUrl() != null) p.setGithubUrl(blankToNull(update.githubUrl()));
        if (update.demoUrl() != null) p.setDemoUrl(blankToNull(update.demoUrl()));
        return ProjectDetailDto.from(p);
    }

    private Profile loadProfile() {
        return profiles.findAll().stream().findFirst()
                .orElseThrow(() -> new NotFoundException("Profile has not been seeded"));
    }

    private Project loadProject(String slug) {
        return projects.findBySlug(slug)
                .orElseThrow(() -> new NotFoundException("No project with slug '" + slug + "'"));
    }

    private static String blankToNull(String value) {
        return value.isBlank() ? null : value.trim();
    }
}
