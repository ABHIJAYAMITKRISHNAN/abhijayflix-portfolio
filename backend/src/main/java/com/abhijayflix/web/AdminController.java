package com.abhijayflix.web;

import com.abhijayflix.service.ContactService;
import com.abhijayflix.service.PortfolioService;
import com.abhijayflix.web.dto.Dtos.*;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Protected endpoints for filling in links once they are available. Requires HTTP Basic auth. */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final PortfolioService portfolio;
    private final ContactService contact;

    public AdminController(PortfolioService portfolio, ContactService contact) {
        this.portfolio = portfolio;
        this.contact = contact;
    }

    @PatchMapping("/profile/links")
    public ProfileDto updateProfileLinks(@Valid @RequestBody ProfileLinksUpdate update) {
        return portfolio.updateProfileLinks(update);
    }

    @PatchMapping("/projects/{slug}/links")
    public ProjectDetailDto updateProjectLinks(@PathVariable String slug,
                                               @Valid @RequestBody ProjectLinksUpdate update) {
        return portfolio.updateProjectLinks(slug, update);
    }

    @GetMapping("/messages")
    public List<ContactMessageDto> messages() {
        return contact.all();
    }
}
