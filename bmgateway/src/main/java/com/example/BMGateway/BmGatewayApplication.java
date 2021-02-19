package com.example.BMGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class BmGatewayApplication {

	@RequestMapping(value = "/")
	public String getHelloGateway(){
		return "Hello Baby Monkey";
	}

	@RequestMapping(value = "/ge")
	public String getGetGaway(){
		return "getGetGaway";
	}

	public static void main(String[] args) {
		SpringApplication.run(BmGatewayApplication.class, args);
	}

}
