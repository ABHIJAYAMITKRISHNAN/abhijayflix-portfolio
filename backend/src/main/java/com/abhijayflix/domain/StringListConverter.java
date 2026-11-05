package com.abhijayflix.domain;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

/** Stores a list of strings as a single pipe-delimited text column. */
@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {

    private static final String DELIMITER = "|";

    @Override
    public String convertToDatabaseColumn(List<String> items) {
        if (items == null || items.isEmpty()) {
            return null;
        }
        return String.join(DELIMITER, items);
    }

    @Override
    public List<String> convertToEntityAttribute(String column) {
        if (column == null || column.isBlank()) {
            return List.of();
        }
        return Arrays.stream(column.split(Pattern.quote(DELIMITER)))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }
}
