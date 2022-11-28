package co.com.claro.email.dto.email.notification;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageBox implements Serializable {

	@JsonProperty("messageChannel")
	private String messageChannel;

	@JsonProperty("messageBox")
	private List<MessageBox__1> messageBoxs = new ArrayList<>();

	public void addMessageBox(String customerBox, String customerId) {

		MessageBox__1 messageBox1 = new MessageBox__1();
		messageBox1.setCustomerBox(customerBox);
		messageBox1.setCustomerId(customerId);
		messageBoxs.add(messageBox1);

	}

}
