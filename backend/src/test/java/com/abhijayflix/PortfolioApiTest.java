package com.abhijayflix;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PortfolioApiTest {

    @Autowired
    MockMvc mvc;

    @Test
    void portfolioIsServedFromSeededDatabase() throws Exception {
        mvc.perform(get("/api/portfolio"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.profile.fullName").value("Abhijay Krishnan"))
                .andExpect(jsonPath("$.profile.email").value("abhijay.k2004@gmail.com"))
                .andExpect(jsonPath("$.profile.phone").value("+91 8779479851"))
                .andExpect(jsonPath("$.profile.githubUrl").value("https://github.com/ABHIJAYAMITKRISHNAN"))
                .andExpect(jsonPath("$.profile.resumeUrl").value(nullValue()))
                .andExpect(jsonPath("$.profile.introduction", hasSize(3)))
                .andExpect(jsonPath("$.projects", hasSize(4)))
                .andExpect(jsonPath("$.projects[0].slug").value("payment-aiops-platform"))
                .andExpect(jsonPath("$.projects[2].year").value(nullValue()))
                .andExpect(jsonPath("$.experiences", hasSize(2)))
                .andExpect(jsonPath("$.skills", hasSize(7)))
                .andExpect(jsonPath("$.education[0].institution").value("MPSTME, SVKM’s NMIMS, Mumbai"))
                .andExpect(jsonPath("$.certifications", hasSize(5)));
    }

    @Test
    void projectDetailIncludesSectionsAndMetrics() throws Exception {
        mvc.perform(get("/api/projects/payment-aiops-platform"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sections[2].kind").value("FLOW"))
                .andExpect(jsonPath("$.sections[5].items", hasItem("Human Approval")))
                .andExpect(jsonPath("$.metrics[0].value").value("1.00"))
                .andExpect(jsonPath("$.githubUrl").value(nullValue()));
    }

    @Test
    void unknownProjectReturns404() throws Exception {
        mvc.perform(get("/api/projects/does-not-exist")).andExpect(status().isNotFound());
    }

    @Test
    void contactValidatesAndAcceptsMessages() throws Exception {
        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"\",\"email\":\"nope\",\"message\":\"\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.email").exists());

        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Recruiter\",\"email\":\"r@example.com\",\"message\":\"Hello!\"}"))
                .andExpect(status().isCreated());
    }

    @Test
    void adminEndpointsRequireCredentials() throws Exception {
        String body = "{\"githubUrl\":\"https://example.com/repo\"}";
        mvc.perform(patch("/api/admin/projects/quickparcel/links")
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isUnauthorized());

        mvc.perform(patch("/api/admin/projects/quickparcel/links").with(httpBasic("admin", "test-secret"))
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.githubUrl").value("https://example.com/repo"))
                .andExpect(jsonPath("$.demoUrl").value(nullValue()));
    }

    @Test
    void writesOutsideContactAreRejected() throws Exception {
        mvc.perform(post("/api/projects").contentType(MediaType.APPLICATION_JSON).content("{}"))
                .andExpect(status().is4xxClientError());
    }
}
