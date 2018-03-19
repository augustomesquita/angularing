package com.augustomesquita.angularingbackend.springsecurity.controller;

import com.augustomesquita.angularingbackend.model.JUser;
import com.augustomesquita.angularingbackend.springsecurity.dto.JAuthenticationDTO;
import com.augustomesquita.angularingbackend.springsecurity.dto.JTokenDTO;
import com.augustomesquita.angularingbackend.springsecurity.utils.JJwtUtil;
import com.augustomesquita.angularingbackend.utils.JResponseUtil;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.augustomesquita.angularingbackend.service.IUserService;
import com.augustomesquita.angularingbackend.springsecurity.dto.JUserAndTokenDTO;
import com.augustomesquita.angularingbackend.utils.JConvertToDtoUtil;

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

    @Autowired
    private JJwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private IUserService userService;

    /**
     * Gera e retorna um novo token JWT
     *
     * @param authenticationDTO
     * @param result
     * @return ResponseEntity<JResponseUtil<JTokenDTO>> @throw s
     * AuthenticationException
     */
    @PostMapping
    public ResponseEntity<JResponseUtil<JUserAndTokenDTO>> createTokenJwt(
            @Valid @RequestBody JAuthenticationDTO authenticationDTO,
            BindingResult result) throws AuthenticationException {

        JResponseUtil<JUserAndTokenDTO> response = new JResponseUtil<JUserAndTokenDTO>();

        // Verifica se já ocorreu algum erro de chamada
        if (result.hasErrors()) {
            LOG.error("Erro validando lançamento: {}", result.getAllErrors());
            result.getAllErrors().forEach(error
                    -> response.getErrors().add(error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(response);
        }

        // Verifica se as credênciais se referem a um usuário válido do sistema
        Optional<JUser> validUser = userService.findByEmailAndPassword(authenticationDTO.getEmail(), authenticationDTO.getPassword());
        if (validUser.isPresent()) {

            // Caso as credênciais sejam de um usuário válido no sistema, 
            // gera um usuário no formato do spring security (userDetail)
            // passando seu username (que é o email do usuário).
            UserDetails userDetails = userDetailsService.loadUserByUsername(
                    validUser.get().getEmail());

            // Gera um token para o usuário
            generateToken(userDetails, validUser.get(), response);

            return ResponseEntity.ok(response);

        } else {
            // Caso as credênciais não sejam de um usuário válido no sistema,
            // cria um usuário para a conta passada. Após isso 
            // gera um usuário no formato do spring security (userDetail)
            // passando seu username (que é o email do usuário que foi criado).
            JUser userJustCreated = userService.save(authenticationDTO.getName(), authenticationDTO.getEmail(), authenticationDTO.getPassword(), authenticationDTO.getPhotoUrl());
            UserDetails userDetails = userDetailsService.loadUserByUsername(userJustCreated.getEmail());

            // Gera um token para o usuário
            generateToken(userDetails, userJustCreated, response);

            return ResponseEntity.ok(response);
        }
    }

    @PostMapping(value = "/refresh")
    public ResponseEntity<JResponseUtil<JTokenDTO>> refreshTokenJwt(
            HttpServletRequest request) {

        LOG.info("Gerando refresh para token JWT");
        JResponseUtil<JTokenDTO> response = new JResponseUtil<>();

        // Pega o token vindo do header.
        String token = JJwtUtil.getTokenFromHeader(request);

        // Verifica se token está vazio ou se é inválido.
        if (token.isEmpty()) {
            response.getErrors().add("Token não informado.");
        } else if (!jwtUtil.isTokenValid(token)) {
            response.getErrors().add("Token inválido ou expirado.");
        }

        // Verifica se ocorreu algum erro
        if (!response.getErrors().isEmpty()) {
            return ResponseEntity.badRequest().body(response);
        }

        // Realiza o refresh de fato
        String refreshedToken = jwtUtil.refreshToken(token);
        response.setData(new JTokenDTO(refreshedToken));

        // Envia novo token atualizado como resposta do tipo OK.
        return ResponseEntity.ok(response);
    }

    private void generateToken(UserDetails userDetails, JUser validUser, JResponseUtil<JUserAndTokenDTO> response) {
        LOG.info("Gerando token JWT para o email {}.", userDetails.getUsername());
        String token = jwtUtil.getToken(userDetails);
        response.setData(new JUserAndTokenDTO(token, JConvertToDtoUtil.convertUser(validUser)));
    }

}
