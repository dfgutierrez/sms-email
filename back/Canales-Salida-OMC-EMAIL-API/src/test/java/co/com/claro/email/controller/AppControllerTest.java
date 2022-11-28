package co.com.claro.email.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;

import co.com.claro.email.dto.RequestDTO;
import co.com.claro.email.dto.ResponseDTO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class AppControllerTest {

	@LocalServerPort
	private int port;

	@Value("/api/v1")
	private String path;

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	@Tag("Integration")
	@DisplayName("Prueba de integracion con valores para obtener el envio de un mensaje")
	void testSendSMS() {

		final var url = "http://localhost:" + port + path + "/email/send";
		log.debug("url: {}", url);

		final var request = new RequestDTO();
		request.setMessage("mensaje");
		request.setEmail("me@example.com");

		final var response = restTemplate.postForObject(url, request, ResponseDTO.class);
		assertNotNull(response);
		assertNotNull(response.getTransactionDate());
		assertNotNull(response.getTransactionId());
		assertNotNull(response.getMessage());
		assertEquals("OK", response.getMessage());
		assertThat(response.getResponseCode()).isEqualTo(HttpStatus.OK);

	}

	@Test
	@Tag("Integration")
	@DisplayName("Prueba de integracion con el email invalido")
	void testSendSMSInvalidEmail() {

		final var url = "http://localhost:" + port + path + "/email/send";
		log.debug("url: {}", url);

		final var request = new RequestDTO();
		request.setMessage("mensaje");
		request.setEmail("");

		final var response = restTemplate.postForObject(url, request, ResponseDTO.class);
		assertNotNull(response);
		assertNotNull(response.getTransactionDate());
		assertNotNull(response.getTransactionId());
		assertNotNull(response.getMessage());
		assertThat(response.getResponseCode()).isEqualTo(HttpStatus.BAD_REQUEST);

	}

	@Test
	@Tag("Integration")
	@DisplayName("Prueba de integracion con el mensaje vacio")
	void testSendSMSEmptyMessage() {

		final var url = "http://localhost:" + port + path + "/email/send";
		log.debug("url: {}", url);

		final var request = new RequestDTO();
		request.setMessage("");
		request.setEmail("me@example.com");

		final var response = restTemplate.postForObject(url, request, ResponseDTO.class);
		assertNotNull(response);
		assertNotNull(response.getTransactionDate());
		assertNotNull(response.getTransactionId());
		assertNotNull(response.getMessage());
		assertThat(response.getResponseCode()).isEqualTo(HttpStatus.BAD_REQUEST);

	}

}
