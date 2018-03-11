package com.augustomesquita.angularingbackend.springsecurity.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

/**
 *
 * @author Augusto Mesquita
 */
@Component
public class JJwtUtil {

    private final String CLAIM_KEY_USERNAME = "sub";
    private final String CLAIM_KEY_ROLE = "role";
    private final String CLAIM_KEY_CREATED = "created";

    public static final String AUTH_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer";

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    /**
     * Resgata token do header a partir do request, removendo o prefixo 'bearer'
     * que vem junto ao token.
     *
     * @param request
     * @return
     */
    public static String getTokenFromHeader(HttpServletRequest request) {
        // Resgata token a partir do header 'Authorization'
        String token = request.getHeader(AUTH_HEADER);
        if (token != null
                && token.startsWith(JJwtUtil.BEARER_PREFIX)
                && token.split(JJwtUtil.BEARER_PREFIX).length > 1) {
            // Remove bearer da string
            token = token.split(JJwtUtil.BEARER_PREFIX)[1];
        }
        return token;
    }

    /**
     * Retorna um novo token JWT com base nos dados do usuários.
     *
     * @param userDetails
     * @return String
     */
    public String getToken(UserDetails userDetails) {
        Map< String, Object> claims = new HashMap<>();
        claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
        userDetails.getAuthorities().forEach(
                authority -> claims.put(CLAIM_KEY_ROLE, authority.getAuthority()));
        claims.put(CLAIM_KEY_CREATED, new Date());
        return createToken(claims);
    }

    /**
     * Obtém o Username (email) do usuário contido no token JWT.
     *
     * @param token
     * @return String
     */
    public String getUsernameFromToken(String token) {
        String username;
        try {
            Claims claims = getClaimsFromToken(token);
            username = claims.getSubject();
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    /**
     * Retorna a data de expiração de um token JWT.
     *
     * @param token
     * @return Date
     */
    public Date getExpirationDateFromToken(String token) {
        Date expiration;
        try {
            Claims claims = getClaimsFromToken(token);
            expiration = claims.getExpiration();
        } catch (Exception e) {
            expiration = null;
        }
        return expiration;
    }

    /**
     * Cria um novo token (refresh).
     *
     * @param token
     * @return String
     */
    public String refreshToken(String token) {
        String refreshedToken;
        try {
            Claims claims = getClaimsFromToken(token);
            claims.put(CLAIM_KEY_CREATED, new Date());
            refreshedToken = createToken(claims);
        } catch (Exception e) {
            refreshedToken = null;
        }
        return refreshedToken;
    }

    /**
     * Verifica e retorna se um token JWT é válido.
     *
     * @param token
     * @return boolean
     */
    public boolean isTokenValid(String token) {
        return !isTokenExpired(token);
    }

    /**
     * Retorna a data de expiração com base na data atual.
     *
     * @return Date
     */
    private Date getExpirationDate() {
        return new Date(System.currentTimeMillis() + expiration * 1000);
    }

    /**
     * Verifica se um token JTW está expirado.
     *
     * @param token
     * @return boolean
     */
    private boolean isTokenExpired(String token) {
        Date expirationDate = this.getExpirationDateFromToken(token);
        if (expirationDate == null) {
            return false;
        }
        return expirationDate.before(new Date());
    }

    /**
     * Cria um novo token JWT contendo os dados (claims) fornecidos.
     *
     * @param claims
     * @return String
     */
    private String createToken(Map< String, Object> claims) {
        return Jwts.builder().setClaims(claims).setExpiration(getExpirationDate())
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    /**
     * Realiza o parse do token JWT para extrair as informações contidas no
     * corpo dele (claims) que são dados reinvidicados pela nossa API para
     * verificação da autenticidade do mesmo.
     *
     * @param token
     * @return Claims
     */
    private Claims getClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser().
                    setSigningKey(secret).parseClaimsJws(token).getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }

}
