package es.urjc.code.rest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;
@RestController
public class MainController {
	
	@PostMapping("/anuncios")
        @ResponseStatus(HttpStatus.CREATED)
	public Anuncio anuncios(@RequestBody Anuncio anuncio) {
		return anuncio;
	}
        @PostMapping("/prueba")
        @ResponseStatus(HttpStatus.CREATED)
	public String prueba() {
		return "HOla";
	}

}
