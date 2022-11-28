package co.com.claro.email.properties;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
public class MessageRequestProperties implements Serializable {

	@Value("${MESSAGE_REQUEST_COMMUNICATIONORIGIN:TCRM}")
	private String communicationOrigin;

	@Value("${MESSAGE_REQUEST_COMMUNICATIONTYPE:REGULATORIO}")
	private String communicationType;

	@Value("${MESSAGE_REQUEST_CONTENTTYPE:MESSAGE}")
	private String contentType;

	@Value("${MESSAGE_REQUEST_DELIVERYRECEIPTS:NO}")
	private String deliveryReceipts;

	@Value("${MESSAGE_REQUEST_PUSHTYPE:SINGLE}")
	private String pushType;

	@Value("${MESSAGE_REQUEST_TYPECOSTUMER:9F1AA44D-B90F-E811-80ED-FA163E10DFBE}")
	private String typeCostumer;

	@Value("${MESSAGE_REQUEST_PROFILEID:SMTP_FS_TCRM1,SMS_FS_TCRM1}")
	private List<String> profileIDS;
}
