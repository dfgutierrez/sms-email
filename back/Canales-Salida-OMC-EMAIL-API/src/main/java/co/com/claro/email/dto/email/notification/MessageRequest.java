package co.com.claro.email.dto.email.notification;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageRequest {

	@JsonProperty("pushType")
	private String pushType;

	@JsonProperty("typeCostumer")
	private String typeCostumer;

	@JsonProperty("messageBox")
	private List<MessageBox> messageBox = new ArrayList<>();

	@JsonProperty("profileId")
	private List<String> profileId = new ArrayList<>();

	@JsonProperty("communicationType")
	private List<String> communicationType = new ArrayList<>();

	@JsonProperty("communicationOrigin")
	private String communicationOrigin;

	@JsonProperty("deliveryReceipts")
	private String deliveryReceipts;

	@JsonProperty("contentType")
	private String contentType;

	@JsonProperty("messageContent")
	private String messageContent;

	@JsonProperty("idMessage")
	private String idMessage;

	@JsonProperty("dateTime")
	private Long dateTime;

	@JsonProperty("stateDate")
	private String stateDate;

	@JsonProperty("state")
	private String state;

	@JsonProperty("subject")
	private String subject;

	public void addMessageBox(String messageChannel, String... customerBoxs) {

		if (customerBoxs != null && customerBoxs.length > 0) {

			for (String customerbox : customerBoxs) {

				MessageBox messagebox = new MessageBox();
				messagebox.setMessageChannel(messageChannel);
				messagebox.addMessageBox(customerbox, "9F1AA44D-B90F-E811-80ED-FA163E10DFBE");
				this.messageBox.add(messagebox);

			}

		}

	}

	public void addProfileId(String... profileids) {

		if (profileids != null && profileids.length > 0) {

			for (String profileid : profileids) {

				this.profileId.add(profileid);

			}

		}

	}

	public void addProfileId(List<String> profileids) {

		if (profileids != null && !profileids.isEmpty()) {

			for (String profileid : profileids) {

				this.profileId.add(profileid);

			}

		}

	}

	public void addCommunicationType(String... communicationTypes) {

		if (communicationTypes != null && communicationTypes.length > 0) {

			for (String communicationtype : communicationTypes) {

				this.communicationType.add(communicationtype);

			}

		}

	}
}
