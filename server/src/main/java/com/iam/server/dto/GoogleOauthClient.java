package com.iam.server.dto;

import lombok.Data;

@Data
public class GoogleOauthClient {
    private String name;
    private String email;
    private String profileImg;
}
