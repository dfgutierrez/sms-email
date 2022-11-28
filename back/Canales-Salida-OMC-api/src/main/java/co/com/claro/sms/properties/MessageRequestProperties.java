package co.com.claro.sms.properties;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
public class MessageRequestProperties implements Serializable {

	@Value("${MESSAGE_REQUEST_COMMUNICATIONORIGIN:TCRM}")
	private String communicationOrigin;

	@Value("${MESSAGE_REQUEST_COMMUNICATIONTYPE:COMERCIAL}")
	private String communicationType;

	@Value("${MESSAGE_REQUEST_CONTENTTYPE:MESSAGE}")
	private String contentType;

	@Value("${MESSAGE_REQUEST_DELIVERYRECEIPTS:YES}")
	private String deliveryReceipts;

	@Value("${MESSAGE_REQUEST_PUSHTYPE:SINGLE}")
	private String pushType;

	@Value("${MESSAGE_REQUEST_TYPECOSTUMER:25987563}")
	private String typeCostumer;

}
