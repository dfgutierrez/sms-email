package co.com.claro.sms.exception.handler;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import brave.Tracer;
import co.com.claro.sms.dto.ResponseDTO;
import co.com.claro.sms.exception.BadRequestException;

@ControllerAdvice
public class BadRequestExceptionHandler {

	@Autowired
	private Tracer tracer;

	@ExceptionHandler
	public ResponseEntity<ResponseDTO> exceptionHandler(BadRequestException ex) {

		final var error = new ResponseDTO();

		error.setTransactionDate(new Date());
		error.setResponseCode(HttpStatus.BAD_REQUEST);
		error.setMessage(String.format("BadRequest error: %s", ex.getMessage()));
		error.setTransactionId(tracer.currentSpan().context().traceIdString());

		// Agregar error
		if (ex.getCause() != null) {
			error.setMessage(String.format("BadRequest error: %s", ex.getCause().getMessage()));
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);

	}

}
