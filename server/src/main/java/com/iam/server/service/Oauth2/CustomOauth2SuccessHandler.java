package com.iam.server.service.Oauth2;

import com.iam.server.entity.LoginProvider;
import com.iam.server.entity.User;
import com.iam.server.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
@Component
public class CustomOauth2SuccessHandler implements AuthenticationSuccessHandler {
    @Autowired
    private UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String redirectUrl = "/auth/oauth2/login";
        if(authentication.getPrincipal() instanceof DefaultOAuth2User) {
            DefaultOAuth2User  userDetails = (DefaultOAuth2User ) authentication.getPrincipal();
            String username = userDetails.getAttribute("email") !=null?userDetails.getAttribute("email"):userDetails.getAttribute("login")+"@gmail.com" ;
            String name = userDetails.getAttribute("name");
            if(userRepository.findByEmail(username) == null) {
                User user = new User();
                user.setFullName(name);
                user.setEmail(username);
                user.setAuthProvider(LoginProvider.GOOGLE);
                userRepository.save(user);
            }
        }
        new DefaultRedirectStrategy().sendRedirect(request, response, redirectUrl);

    }
}
