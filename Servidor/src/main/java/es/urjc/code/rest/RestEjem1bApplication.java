package es.urjc.code.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.Properties;

@SpringBootApplication
public class RestEjem1bApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestEjem1bApplication.class, args);
//                SpringApplication app =new SpringApplication(RestEjem1bApplication.class);
//
//                Properties properties = new Properties();
//        properties.setProperty("spring.resources.staticLocations",
//                          "classpath:/static/");
//        app.setDefaultProperties(properties);
//        app.run(args);
	}
}
