package co.com.claro.sms.dto;

import java.io.Serializable;
import java.util.Date;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiModelProperty.AccessMode;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(description = "Entidada que contiene la respuesta del legado")
public class ResponseDTO implements Serializable {

	@ApiModelProperty(dataType = "string", example = "OK", value = "Mensaje", accessMode = AccessMode.READ_ONLY)
	private String message;

	@ApiModelProperty(dataType = "string", example = "7e794791a26e3ff4", value = "ID de transaccion", accessMode = AccessMode.READ_ONLY)
	private String transactionId;

	@ApiModelProperty(dataType = "string", example = "06-06-2022 05:21:18", value = "Fecha de la transaccion", accessMode = AccessMode.READ_ONLY)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
	private Date transactionDate;

	@ApiModelProperty(dataType = "string", example = "OK", value = "Codigo de respuesta", accessMode = AccessMode.READ_ONLY)
	private HttpStatus responseCode;

}
