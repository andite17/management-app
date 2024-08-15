package com.iam.server.service;

import com.iam.server.dto.RegisterRequest;
import com.iam.server.dto.RegisterResponse;
import com.iam.server.entity.LoginProvider;
import com.iam.server.entity.User;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper {
    public User toUser(RegisterRequest request) {
        User user = new User();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setAuthProvider(LoginProvider.INTERNAL);
        return user;
    }

    public RegisterResponse toRegisterResponse(User result) {
        return new RegisterResponse(
                result.getFullName(),
                result.getEmail()
        );
    }
}
