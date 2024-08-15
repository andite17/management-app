package com.iam.server.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Position {
    CEO("ceo"),
    DIRECTUR("directur"),
    MANAGER("manager"),
    STAFF("staff");

    private final String position;

    Position(String position){
        this.position=position;
    }

    @JsonValue
    public String getPosition() {
        return position;
    }

    @JsonCreator
    public static Position fromValue(String value) {
        for (  Position position : values()) {
            String currentPosition = position.getPosition();
            if (currentPosition.equals(value)) {
                return position;
            }
        }

        // Return a response entity with a 400 Bad Request status
        throw new IllegalArgumentException("Invalid value for Contact type Enum: " + value);
    }
}
