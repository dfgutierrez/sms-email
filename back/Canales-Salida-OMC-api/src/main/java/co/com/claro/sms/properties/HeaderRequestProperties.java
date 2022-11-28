package co.com.claro.sms.properties;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
public class HeaderRequestProperties implements Serializable {

	@Value("${HEADER_REQUEST_SYSTEM:system432}")
	private String system;

	@Value("${HEADER_REQUEST_TARGET:target}")
	private String target;

	@Value("${HEADER_REQUEST_USER:user433}")
	private String user;

	@Value("${HEADER_REQUEST_PASSWORD:system432}")
	private String password;

	@Value("${HEADER_REQUEST_FORMAT_DATE:yyyy-MM-dd'T'HH:mm:ss.SSS}")
	private String requestDateFormat;

	@Value("${HEADER_REQUEST_IPAPPLICATION:127.0.0.1}")
	private String ipApplication;

	@Value("${HEADER_REQUEST_TRACEABILITYID:traceabilityId436}")
	private String traceabilityId;

}
