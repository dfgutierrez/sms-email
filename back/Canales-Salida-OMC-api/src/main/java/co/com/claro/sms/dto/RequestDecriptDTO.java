package co.com.claro.sms.dto;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestDecriptDTO implements Serializable {

	private String token;
}
