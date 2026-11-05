package com.abhijayflix.web.dto;

import com.abhijayflix.domain.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.List;

/** API response and request payloads. */
public final class Dtos {

    private Dtos() {
    }

    public record ProfileDto(String fullName, String brandName, String title, List<String> introduction,
                             String aboutTitle, List<String> aboutText, String email, String phone,
                             String linkedinUrl, String githubUrl, String resumeUrl, String imageUrl) {
        public static ProfileDto from(Profile p) {
            return new ProfileDto(p.getFullName(), p.getBrandName(), p.getTitle(), p.getIntroduction(),
                    p.getAboutTitle(), p.getAboutText(), p.getEmail(), p.getPhone(), p.getLinkedinUrl(),
                    p.getGithubUrl(), p.getResumeUrl(), p.getImageUrl());
        }
    }

    /** Lightweight project card used in rows. */
    public record ProjectSummaryDto(String slug, String title, String shortTitle, Integer year,
                                    List<String> categories, List<String> techStack, String tagline,
                                    String posterVariant, String accentColor, int position) {
        public static ProjectSummaryDto from(Project p) {
            return new ProjectSummaryDto(p.getSlug(), p.getTitle(), p.getShortTitle(), p.getYear(),
                    p.getCategories(), p.getTechStack(), p.getTagline(), p.getPosterVariant(),
                    p.getAccentColor(), p.getPosition());
        }
    }

    public record SectionDto(String heading, String kind, String body, List<String> items) {
        public static SectionDto from(ProjectSection s) {
            return new SectionDto(s.getHeading(), s.getKind().name(), s.getBody(), s.getItems());
        }
    }

    public record MetricDto(String label, String value, String note) {
        public static MetricDto from(ProjectMetric m) {
            return new MetricDto(m.getLabel(), m.getValue(), m.getNote());
        }
    }

    public record ProjectDetailDto(String slug, String title, String shortTitle, Integer year,
                                   List<String> categories, List<String> techStack, String tagline,
                                   String summary, String notes, String posterVariant, String accentColor,
                                   String githubUrl, String demoUrl, int position,
                                   List<SectionDto> sections, List<MetricDto> metrics) {
        public static ProjectDetailDto from(Project p) {
            return new ProjectDetailDto(p.getSlug(), p.getTitle(), p.getShortTitle(), p.getYear(),
                    p.getCategories(), p.getTechStack(), p.getTagline(), p.getSummary(), p.getNotes(),
                    p.getPosterVariant(), p.getAccentColor(), p.getGithubUrl(), p.getDemoUrl(), p.getPosition(),
                    p.getSections().stream().map(SectionDto::from).toList(),
                    p.getMetrics().stream().map(MetricDto::from).toList());
        }
    }

    public record ExperienceDto(String slug, String company, String role, String duration, String summary,
                                List<String> techStack, List<String> responsibilities, List<String> highlights) {
        public static ExperienceDto from(Experience e) {
            return new ExperienceDto(e.getSlug(), e.getCompany(), e.getRole(), e.getDuration(), e.getSummary(),
                    e.getTechStack(), e.getResponsibilities(), e.getHighlights());
        }
    }

    public record SkillCategoryDto(String slug, String name, List<String> skills) {
        public static SkillCategoryDto from(SkillCategory c) {
            return new SkillCategoryDto(c.getSlug(), c.getName(), c.getSkills());
        }
    }

    public record EducationDto(String degree, String branch, String institution, String expectedGraduation) {
        public static EducationDto from(Education e) {
            return new EducationDto(e.getDegree(), e.getBranch(), e.getInstitution(), e.getExpectedGraduation());
        }
    }

    public record CertificationDto(String title, String kind) {
        public static CertificationDto from(Certification c) {
            return new CertificationDto(c.getTitle(), c.getKind());
        }
    }

    /** Everything the home page needs in a single round trip. */
    public record PortfolioDto(ProfileDto profile, List<ProjectSummaryDto> projects,
                               List<ExperienceDto> experiences, List<SkillCategoryDto> skills,
                               List<EducationDto> education, List<CertificationDto> certifications) {
    }

    public record ContactRequest(
            @NotBlank @Size(max = 120) String name,
            @NotBlank @Email @Size(max = 255) String email,
            @NotBlank @Size(max = 5000) String message) {
    }

    public record ContactMessageDto(Long id, String name, String email, String message, Instant createdAt) {
        public static ContactMessageDto from(ContactMessage m) {
            return new ContactMessageDto(m.getId(), m.getName(), m.getEmail(), m.getMessage(), m.getCreatedAt());
        }
    }

    /**
     * Admin link update. A null field is left unchanged; an empty string clears the value.
     */
    public record ProfileLinksUpdate(@Size(max = 255) String email, @Size(max = 40) String phone,
                                     @Size(max = 500) String linkedinUrl,
                                     @Size(max = 500) String githubUrl, @Size(max = 500) String resumeUrl,
                                     @Size(max = 500) String imageUrl) {
    }

    public record ProjectLinksUpdate(@Size(max = 500) String githubUrl, @Size(max = 500) String demoUrl) {
    }
}
