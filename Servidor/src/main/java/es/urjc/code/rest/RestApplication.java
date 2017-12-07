package es.urjc.code.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@SpringBootApplication
@EnableWebSocket
public class RestApplication implements WebSocketConfigurer{

	public static void main(String[] args) {
		SpringApplication.run(RestApplication.class, args);

	}
        
        @Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(createGameHandler(), "/sala")
			.setAllowedOrigins("*");
	}
	
	@Bean
	public PangSocketHandler createGameHandler() {
		return new PangSocketHandler();
	}
}
