package co.com.claro.sms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.com.claro.sms.dto.RequestDTO;
import co.com.claro.sms.dto.RequestDecriptDTO;
import co.com.claro.sms.dto.RequestEncriptTokenDTO;
import co.com.claro.sms.dto.ResponseDTO;
import co.com.claro.sms.exception.BadRequestException;
import co.com.claro.sms.exception.BussinesException;
import co.com.claro.sms.service.SMSServices;
import co.com.claro.sms.util.AESUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/api/v1")
@Api(tags = "SMS-services", produces = "application/json", value = "Api encargada de enviar un mensaje SMS, crear una BI y guardar el log en la base de datos")
public class AppController {

	@Autowired
	private SMSServices services;

	@Value("${CARACTER_PERMITIDO_VALUE:172}")
	private int caracterPermitido;

	@CrossOrigin
	@PostMapping("/sms/send")
	@ApiOperation(value = "Virtualiza el llamado el envio de un mensaje SMS a un cliente claro", response = ResponseDTO.class, produces = "application/json; charset=UTF-8")
	public ResponseDTO sendSMS(@RequestBody RequestDTO request) throws JsonProcessingException {

		log.info("[[START]] request: {}", request);

		final var watch = new StopWatch();
		watch.start();

		try {

			if (request == null || request.getPhone() == null) {
				throw new BadRequestException("Telefono invalido");
			}

			if (request.getMessage() == null || request.getMessage().isBlank()) {
				throw new BadRequestException("El Mensaje esta vacio");
			}

			if (request.getMessage().length() >= caracterPermitido) {
				throw new BadRequestException("El Mensaje supera el numero de caracteres permitidos");
			}

			return services.sendSMS(request);

		} finally {
			watch.stop();
			log.info("[[END]] el servicio tardo: {}", watch.getTotalTimeMillis());
		}

	}

	@CrossOrigin
	@PostMapping("/sms/encript")
	@ApiOperation(value = "Encripta un JSON dado", response = ResponseDTO.class, produces = "application/json; charset=UTF-8")
	public String encript(@RequestBody RequestEncriptTokenDTO encriptTokenDTO) {

		log.info("[[START]] encriptTokenDTO: {}", encriptTokenDTO);

		String data;

		try {

			data = new ObjectMapper().writeValueAsString(encriptTokenDTO.getData());

			log.info("data: {}", data);

			final var encrypt = AESUtil.encrypt(data, encriptTokenDTO.getKey());
			log.info("encrypt: {}", encrypt);
			return encrypt;

		} catch (JsonProcessingException e) {
			throw new BussinesException(e.getMessage(), e);
		}

	}

	@PostMapping("/sms/decript")
	@ApiOperation(value = "Desencripta un token dado", produces = MediaType.APPLICATION_JSON_VALUE)
	public String decryptToken(@RequestBody RequestDecriptDTO token) {

		var secretKey = services.generateKey();

		return AESUtil.decrypt(token.getToken(), secretKey);
	}

}
