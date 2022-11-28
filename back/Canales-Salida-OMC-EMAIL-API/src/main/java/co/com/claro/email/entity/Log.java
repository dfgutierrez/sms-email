package co.com.claro.email.entity;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import co.com.claro.email.dto.enums.TypeDocument;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document("OMN_LOGS_SMS_EMAIL")
@NoArgsConstructor
public class Log implements Serializable {

	@Id
	private String id;

	private Date date = new Date();
	private String channel = "EMAIL";

	private String phone;
	private String message;

	private TypeDocument typeDocument;
	private String document;
	private String account;
	private String email;
	private String subject;

	private String clientName;
	private String clientEmail;

	private String asesorDocument;
	private String asesorCod;
	private String asesorName;

}
