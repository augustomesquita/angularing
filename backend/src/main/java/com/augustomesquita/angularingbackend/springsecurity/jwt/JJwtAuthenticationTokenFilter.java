package com.augustomesquita.angularingbackend.springsecurity.jwt;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 *
 * @author Augusto Mesquita
 */
public class JJwtAuthenticationTokenFilter extends OncePerRequestFilter {

    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer";

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JJwtUtil tokenUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain) throws
            ServletException, IOException {

        // Resgata token a partir do header 'Authorization'
        String token = request.getHeader(AUTH_HEADER);
        if (token != null && token.startsWith(BEARER_PREFIX)) {
            // Define para pegar apenas o token, ou seja, ignorar a palavra
            // 'Bearer' + 'espaço', iniciando exatamente no token.
            token = token.substring(7);
        }

        // A partir do token, tenta resgatar um username (que em nosso caso, 
        // representa o email do usuário).
        // ** Observe que o token ainda não foi validado.
        String username = tokenUtils.getUsernameFromToken(token);
        if (username != null
                && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails
                    = this.userDetailsService.loadUserByUsername(username);

            if (tokenUtils.isTokenValid(token)) {
                UsernamePasswordAuthenticationToken authentication
                        = new UsernamePasswordAuthenticationToken(userDetails,
                                null, userDetails.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource()
                        .buildDetails(request));
                SecurityContextHolder.getContext().
                        setAuthentication(authentication);
            }
        }
        
        // Aplica o filtro
        chain.doFilter(request, response);
    }

}
