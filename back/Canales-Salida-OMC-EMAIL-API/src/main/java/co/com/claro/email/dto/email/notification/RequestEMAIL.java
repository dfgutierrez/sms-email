package co.com.claro.email.dto.email.notification;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestEMAIL implements Serializable {

	@JsonProperty("headerRequest")
	private HeaderRequest headerRequest;

	@JsonProperty("message")
	private String message;

}