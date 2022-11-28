package co.com.claro.email.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import brave.Tracer;
import co.com.claro.email.client.BIClient;
import co.com.claro.email.dto.RequestDTO;
import co.com.claro.email.dto.ResponseDTO;
import co.com.claro.email.dto.email.notification.EMAILResponse;
import co.com.claro.email.dto.email.notification.HeaderRequest;
import co.com.claro.email.dto.email.notification.MessageRequest;
import co.com.claro.email.dto.email.notification.RequestEMAIL;
import co.com.claro.email.entity.Log;
import co.com.claro.email.exception.BussinesException;
import co.com.claro.email.properties.HeaderRequestProperties;
import co.com.claro.email.properties.MessageRequestProperties;
import co.com.claro.email.util.AESUtil;
import co.com.claro.email.util.Util;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EmailService {

	public static final String INVALID_TOKEN = "El token enviado en la URL es invalido valor de token: %s ";
	public static final String MISSING_VALUE_ERROR = "Hace falta el parametro '%s' en la url de inicio";
	public static final String MISSING_VALUE_ERROR2 = "Hace falta el valor para el parametro '%s' en la url de inicio";

	@Autowired
	private HeaderRequestProperties headerRequestProperties;

	@Autowired
	private MessageRequestProperties messageRequestProperties;

	@Value("${EMAIL_TOKEN_KEY}")
	private String tokenKey;

	@Value("${EMAIL_SEND_URL}")
	private String url;

	@Value("${EMAIL_DEFAULT_SUBJECT}")
	private String subject;

	@Autowired
	private Tracer tracer;

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private LogService logService;

	@Autowired
	private BIClient biClient;

	public ResponseDTO sendEMAIL(RequestDTO request) throws JsonProcessingException {

		final var requestEMAIL = buildRequest(request);
		log.info("requestEMAIL: {}", requestEMAIL);

		final var httpEntity = new HttpEntity<>(requestEMAIL);
		final ResponseEntity<EMAILResponse> responseEMAIL = restTemplate.exchange(url, HttpMethod.PUT, httpEntity,
				EMAILResponse.class);
		log.info("responseSMS: {}", responseEMAIL.getBody());

		insertLog(request);

		if (request.getBi() != null) {

			final var message = new ObjectMapper().writeValueAsString(request.getBi());
			biClient.createHeader(message);

		}

		ResponseDTO response = new ResponseDTO();
		response.setMessage("OK");
		response.setResponseCode(HttpStatus.OK);
		response.setTransactionDate(new Date());
		response.setTransactionId(getTraceId());

		return response;
	}

	public void insertLog(RequestDTO request) {

		final var auditLog = new Log();
		auditLog.setAccount(request.getClientAccount());
		auditLog.setAsesorCod(request.getAsesorCod());
		auditLog.setAsesorDocument(request.getAsesorDocument());
		auditLog.setAsesorName(request.getAsesorName());
		auditLog.setChannel("EMAIL");
		auditLog.setDocument(request.getClientDocument());
		auditLog.setClientEmail(request.getEmail());
		auditLog.setMessage(request.getMessage());
		auditLog.setSubject(request.getSubject());
		auditLog.setClientName(request.getClientName());
		auditLog.setTypeDocument(request.getClientTypeDocument());

		logService.insert(auditLog);

	}

	public String decript(String token) {

		final var key = generateKey();
		return tokenToMap(token, key);

	}

	public String generateKey() {

		final var date = Util.dateToString(new Date(), "yyyyMMdd");
		return tokenKey + date;

	}

	public RequestEMAIL buildRequest(RequestDTO request) {

		final var requestEMAIL = new RequestEMAIL();

		final var headerRequest = new HeaderRequest();
		headerRequest.setIpApplication(headerRequestProperties.getIpApplication());
		headerRequest.setPassword(headerRequestProperties.getPassword());
		headerRequest.setRequestDate(Util.dateToString(new Date(), headerRequestProperties.getRequestDateFormat()));
		headerRequest.setSystem(headerRequestProperties.getSystem());
		headerRequest.setTarget(headerRequestProperties.getTarget());
		headerRequest.setTraceabilityId(headerRequestProperties.getTraceabilityId());
		headerRequest.setTransacitonID(getTraceId());
		headerRequest.setUser(headerRequestProperties.getUser());

		requestEMAIL.setHeaderRequest(headerRequest);

		final var messageRequest = new MessageRequest();
		messageRequest.setDateTime(new Date().getTime());
		messageRequest.setCommunicationOrigin(messageRequestProperties.getCommunicationOrigin());
		messageRequest.addCommunicationType(messageRequestProperties.getCommunicationType());
		messageRequest.setContentType(messageRequestProperties.getContentType());
		messageRequest.setDeliveryReceipts(messageRequestProperties.getDeliveryReceipts());
		messageRequest.setMessageContent(request.getMessage());
		messageRequest.addProfileId(messageRequestProperties.getProfileIDS());
		messageRequest.setPushType(messageRequestProperties.getPushType());
		messageRequest.setTypeCostumer(messageRequestProperties.getTypeCostumer());
		messageRequest.setIdMessage(getTraceId());

		if (request.getSubject() == null || request.getSubject().isBlank()) {
			messageRequest.setSubject(subject);
		} else {
			messageRequest.setSubject(request.getSubject());
		}

		messageRequest.addMessageBox("SMTP", request.getEmail());

		try {

			// Convertir a string
			final var jsonMessage = Util.objectToJson(messageRequest);
			requestEMAIL.setMessage(jsonMessage);

			log.info("json: {}", jsonMessage);

		} catch (final JsonProcessingException e) {
			log.error("JsonProcessingException: {}", e.getMessage(), e);
		}

		return requestEMAIL;

	}

	/**
	 * Metodo para obtener el id de la transaccion
	 *
	 * @return trace id
	 */
	public String getTraceId() {

		if (tracer != null && tracer.currentSpan() != null && tracer.currentSpan().context() != null)
			return tracer.currentSpan().context().traceIdString();

		return null;
	}

	private String tokenToMap(String token, String key) {

		try {

			final var desencriptado = AESUtil.decrypt(token, key);
			log.info("Token decriptado: {}", desencriptado);

			return desencriptado;

		} catch (final Exception e) {
			throw new BussinesException(e.getMessage());
		}

	}

}