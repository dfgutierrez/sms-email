
package co.com.claro.sms.dto.sms.notification;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HeaderRequest implements Serializable {

	@JsonProperty("transacitonID")
	private String transacitonID;

	@JsonProperty("system")
	private String system;

	@JsonProperty("target")
	private String target;

	@JsonProperty("user")
	private String user;

	@JsonProperty("password")
	private String password;

	@JsonProperty("requestDate")
	private String requestDate;

	@JsonProperty("ipApplication")
	private String ipApplication;

	@JsonProperty("traceabilityId")
	private String traceabilityId;

}
