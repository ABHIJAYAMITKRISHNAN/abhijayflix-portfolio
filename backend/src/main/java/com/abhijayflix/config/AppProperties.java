package com.abhijayflix.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties(prefix = "abhijayflix")
public record AppProperties(List<String> corsAllowedOrigins, Admin admin) {

    public record Admin(String username, String password) {
        public boolean enabled() {
            return password != null && !password.isBlank();
        }
    }
}
