package co.com.claro.email.dto;

import java.io.Serializable;
import java.util.Map;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestEncriptTokenDTO implements Serializable {

	private transient Map<String, Object> data;
	private String key;

}