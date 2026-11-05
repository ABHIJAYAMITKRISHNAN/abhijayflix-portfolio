package com.abhijayflix.web;

import com.abhijayflix.service.ContactService;
import com.abhijayflix.web.dto.Dtos.ContactRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> submit(@Valid @RequestBody ContactRequest request) {
        service.submit(request);
        return Map.of("status", "received");
    }
}
