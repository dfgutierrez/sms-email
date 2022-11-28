package co.com.claro.sms.dto.bi;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HeaderRequestBiDTO implements Serializable {

	@JsonProperty("getOperation")
	private String getOperation;

	@JsonProperty("message")
	private String message;

	@JsonProperty("system")
	private String system;

	@JsonProperty("user")
	private String user;

	@JsonProperty("password")
	private String password;

	@JsonProperty("requestDate")
	private String requestDate;

}
