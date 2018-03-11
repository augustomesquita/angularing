package com.augustomesquita.angularingbackend.springsecurity.jwt;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 *
 * @author Augusto Mesquita
 */
@Component
public class JJwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest hsr, HttpServletResponse response,
            AuthenticationException ae) throws IOException, ServletException {

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                "Acesso negado. Você deve estar autenticado no sistema "
                + "para acessar a URL solicitada.");
    }

}
