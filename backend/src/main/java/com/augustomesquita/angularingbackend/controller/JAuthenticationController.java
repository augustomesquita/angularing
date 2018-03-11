package com.augustomesquita.angularingbackend.controller;

import com.augustomesquita.angularingbackend.springsecurity.dto.JJwtAuthenticationDTO;
import com.augustomesquita.angularingbackend.springsecurity.dto.JTokenDTO;
import com.augustomesquita.angularingbackend.springsecurity.jwt.JJwtUtil;
import com.augustomesquita.angularingbackend.utils.JResponseUtil;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Augusto Mesquita
 */
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class JAuthenticationController {

    private static final Logger LOG
            = LoggerFactory.getLogger(JAuthenticationController.class);
    private static final String AUTH_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer";

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JJwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Gera e retorna um novo token JWT
     * 
     * @param authenticationDTO
     * @param result
     * @return ResponseEntity<JResponseUtil<JTokenDTO>>
     * @throws AuthenticationException 
     */
    
    @PostMapping
    public ResponseEntity<JResponseUtil<JTokenDTO>> createTokenJwt(
            @Valid @RequestBody JJwtAuthenticationDTO authenticationDTO,
            BindingResult result) throws AuthenticationException {

        JResponseUtil<JTokenDTO> response = new JResponseUtil<JTokenDTO>();

        if (result.hasErrors()) {
            LOG.error("Erro validando lançamento: {}", result.getAllErrors());
            result.getAllErrors().forEach(error
                    -> response.getErrors().add(error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(response);
        }

        LOG.info("Gerando token JWT para o email{}.", authenticationDTO.getEmail());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationDTO.getEmail(),
                        authenticationDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = userDetailsService.loadUserByUsername(
                authenticationDTO.getEmail());
        
        String token = jwtUtil.getToken(userDetails);
        response.setData(new JTokenDTO(token));
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping(value = "/refresh")
    public ResponseEntity<JResponseUtil<JTokenDTO>> refreshTokenJwt(
            HttpServletRequest request) {
        
        LOG.info("Gerando refresh para token JWT");
        JResponseUtil<JTokenDTO> response = new JResponseUtil<>();
        Optional<String> token = Optional
                .ofNullable(request.getHeader(AUTH_HEADER));
        
        if (token.isPresent() && token.get().startsWith(BEARER_PREFIX)) {
            // Define 7 para pegar apenas o token, ou seja, ignorar a palavra
            // 'Bearer' + 'espaço', iniciando exatamente no token.
            token = Optional.of(token.get().substring(7));
        }
        
        // Verifica se token não está presente ou se é inválido.
        if (!token.isPresent()) {
            response.getErrors().add("Token não informado.");
        } else if (!jwtUtil.isTokenValid(token.get())) {
            response.getErrors().add("Token inválido ou expirado.");
        }
        
        // Verifica se ocorreu algum erro
        if (!response.getErrors().isEmpty()) {
            return ResponseEntity.badRequest().body(response);
        }
        
        // Realiza o refresh de fato
        String refreshedToken = jwtUtil.refreshToken(token.get());
        response.setData(new JTokenDTO(refreshedToken));
        
        // Envia novo token atualizado como resposta do tipo OK.
        return ResponseEntity.ok(response);
    }
    
}
