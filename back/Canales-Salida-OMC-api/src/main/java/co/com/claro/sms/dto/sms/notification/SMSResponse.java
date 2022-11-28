
package co.com.claro.sms.dto.sms.notification;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SMSResponse {

	@JsonProperty("headerResponse")
	private HeaderResponse headerResponse;

	@JsonProperty("isValid")
	private String isValid;

	@JsonProperty("message")
	private String message;

}
