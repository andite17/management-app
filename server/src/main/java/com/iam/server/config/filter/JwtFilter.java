package com.iam.server.config.filter;

import com.iam.server.repository.UserRepository;
import com.iam.server.service.CustomUserDetails;
import com.iam.server.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtUtil;
    @Autowired
    private JwtDecoder jwtDecoder;

    @Autowired
    private CustomUserDetails userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HandlerExceptionResolver handlerExceptionResolver;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }

        try {
            final String token = authHeader.substring(7);
            if(token.contains(".GOOGLE")) {
                String tokenGoogle = token.split(".GOOGLE")[0];
                try {
                    Jwt jwt = jwtDecoder.decode(tokenGoogle);
                    JwtAuthenticationToken jwtAuthenticationToken = new JwtAuthenticationToken(jwt);
                    jwtAuthenticationToken.setAuthenticated(true);
                    SecurityContextHolder.getContext().setAuthentication(jwtAuthenticationToken);
                } catch (JwtException e) {
                    // Handle token decoding exception
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }
            } else {
                final String username = jwtUtil.extractUsername(token);
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                if(username != null && authentication == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                    if (jwtUtil.validateToken(token, userDetails.getUsername())) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                }

            }
            filterChain.doFilter(request, response);
        } catch (Exception exception) {
            handlerExceptionResolver.resolveException(request, response, null, exception);
        }
    }
}
