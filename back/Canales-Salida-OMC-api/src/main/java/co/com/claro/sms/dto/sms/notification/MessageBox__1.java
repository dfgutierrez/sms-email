
package co.com.claro.sms.dto.sms.notification;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageBox__1 implements Serializable {

	@JsonProperty("customerBox")
	private String customerBox;

}
