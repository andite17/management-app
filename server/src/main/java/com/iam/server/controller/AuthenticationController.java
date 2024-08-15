package com.iam.server.controller;

import com.iam.server.dto.GoogleOauthClient;
import com.iam.server.dto.LoginRequest;
import com.iam.server.dto.LoginResponse;
import com.iam.server.dto.RegisterRequest;
import com.iam.server.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    private ResponseEntity<?> login(@RequestBody @Valid LoginRequest request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }

    @PostMapping("/register")
    private ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @GetMapping("/oauth2/login")
    public ResponseEntity<LoginResponse> oauth2Success() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> attributes = ((DefaultOidcUser) auth.getPrincipal()).getAttributes();

        String tokenGoogle = ((DefaultOidcUser) auth.getPrincipal()).getIdToken().getTokenValue();

        GoogleOauthClient data = new GoogleOauthClient();
        data.setName(attributes.get("name").toString());
        data.setEmail(attributes.get("email").toString());
        data.setProfileImg(attributes.get("picture").toString());

        return ResponseEntity.ok(new LoginResponse(tokenGoogle.concat(".GOOGLE")));
    }
}
