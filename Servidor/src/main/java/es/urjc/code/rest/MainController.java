package es.urjc.code.rest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;
import java.io.FileWriter;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.Writer;
import java.lang.ProcessBuilder.Redirect.Type;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class MainController {
	
	@PostMapping("/UpdatePuntuaciones")
        @ResponseStatus(HttpStatus.CREATED)
	public List<Puntuacion> anuncios(@RequestBody Puntuacion newPunt) throws IOException {
            BufferedReader reader = new BufferedReader(new FileReader("./src/main/resources/static/json_files/Puntuacion.json"));

            Gson gson = new GsonBuilder().create();
//            gson.toJson("Hello", writer);
//            gson.toJson(345, writer);
            java.lang.reflect.Type listType = new TypeToken<List<Puntuacion>>(){}.getType();
            List<Puntuacion> puntuaciones = gson.fromJson(reader, listType);

            reader.close();
		return puntuaciones;
	}
        
        @GetMapping("/GetPuntuaciones")
        @ResponseStatus(HttpStatus.CREATED)
	public List<Puntuacion> getPuntuaciones() throws IOException {
            BufferedReader reader = new BufferedReader(new FileReader("./src/main/resources/static/json_files/Puntuacion.json"));

            Gson gson = new GsonBuilder().create();
//            gson.toJson("Hello", writer);
//            gson.toJson(345, writer);
            java.lang.reflect.Type listType = new TypeToken<List<Puntuacion>>(){}.getType();
            List<Puntuacion> puntuaciones = gson.fromJson(reader, listType);

            reader.close();
		return puntuaciones;
	}
        
        @PostMapping("/prueba")
        @ResponseStatus(HttpStatus.CREATED)
	public String prueba() {
		return "HOla";
	}
}
