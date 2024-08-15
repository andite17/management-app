package com.iam.server.service;

import com.iam.server.dto.*;
import com.iam.server.entity.LoginProvider;
import com.iam.server.entity.User;
import com.iam.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final AuthMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email()).orElseThrow(()->{
            throw new UsernameNotFoundException("Email not found");
        });

        if(!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("email or password not valid");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(token);
    }

    public RegisterResponse register(RegisterRequest request) {
        if(userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email already exist");
        }
        User user = mapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.password()));

        User result = userRepository.save(user);

        return mapper.toRegisterResponse(result);
    }


    public LoginResponse loginGoogle(GoogleOauthClient data) {
        Optional<User> userOptional = userRepository.findByEmail(data.getEmail());
        if(!userOptional.isPresent()) {
            User newUser = new User();
            newUser.setEmail(data.getEmail());
            newUser.setFullName(data.getName());
            newUser.setAuthProvider(LoginProvider.GOOGLE);
            userRepository.save(newUser);
        }

        String token = jwtService.generateToken(data.getEmail());

        return new LoginResponse(token);
    }
}
