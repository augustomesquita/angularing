# Angularing
O objetivo do projeto é explorar a criação e funcionamento de uma SPA (Single Page Application) utilizando framework frontend (Angular 5) e backend (Spring Boot). 
Ambos os projetos visam as melhores práticas para o uso de cada tecnologia. Entre as características de cada plataforma temos:

## Backend
- Linguagem Java 8
- Spring Boot Framework
- Spring Security (segurança da aplicação)
- Spring Data (Java Persistence API através do Spring)
- Spring SSE (Server Send Event)
- Spring WebSocket (STOMP com Message Broker)
- Autenticação para uso da aplicação com as seguintes características:
  * Utilização de token
  * Stateless como forma de autenticação
  * Protocolo de autenticação JWT (JSON Web Token)
  * Funcionamento conjunto com Spring Security
- Postgres SQL (banco de dados)
- Flyway integrado ao Spring (versionamento de banco de dados)
- Utilização do Java Code Convention para codificação (http://www.oracle.com/technetwork/java/codeconvtoc-136057.html)

## Frontend
- Linguagem Vanilla JS (Javascript)
- Angular 5 Framework 
- Geração de projeto com [Angular CLI](https://github.com/angular/angular-cli) versão 1.6.5
- Bootstrap 4
- WebSocket (com @stomp/ng2-stompjs adapatado para funcionamento em Angular4+)
- Integração com login do Facebook para autenticação com backend
- Integração com login do Google para autenticação com backend
