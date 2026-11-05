package com.abhijayflix.service;

import com.abhijayflix.domain.ContactMessage;
import com.abhijayflix.repository.ContactMessageRepository;
import com.abhijayflix.web.dto.Dtos.ContactMessageDto;
import com.abhijayflix.web.dto.Dtos.ContactRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ContactService {

    private final ContactMessageRepository messages;

    public ContactService(ContactMessageRepository messages) {
        this.messages = messages;
    }

    @Transactional
    public void submit(ContactRequest request) {
        messages.save(new ContactMessage(request.name().trim(), request.email().trim(), request.message().trim()));
    }

    @Transactional(readOnly = true)
    public List<ContactMessageDto> all() {
        return messages.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream()
                .map(ContactMessageDto::from).toList();
    }
}
