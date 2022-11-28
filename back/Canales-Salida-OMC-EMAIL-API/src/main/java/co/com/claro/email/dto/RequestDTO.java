package co.com.claro.email.dto;

import java.io.Serializable;
import java.util.Map;

import co.com.claro.email.dto.enums.TypeDocument;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(description = "Entidada que contiene la informacion para el funcionamiento del servicio")
public class RequestDTO implements Serializable {

	@ApiModelProperty(dataType = "string", example = "Leonardo@gamil.com", value = "email", required = true)
	private String email;

	@ApiModelProperty(dataType = "string", example = "Hello!!", value = "Mensaje", required = true)
	private String message;

	@ApiModelProperty(dataType = "string", example = "Mensaje de prueba", value = "Asunto del email", required = true)
	private String subject;

	@ApiModelProperty(dataType = "string", allowableValues = "CC, TI, CE, PS, NI, CD, NU", value = "Tipos de documentos permitidos")
	private TypeDocument clientTypeDocument;

	@ApiModelProperty(dataType = "string", example = "1010256892", value = "Documento cliente")
	private String clientDocument;

	@ApiModelProperty(dataType = "string", example = "7629929", value = "Numero de cuenta del cliente")
	private String clientAccount;

	@ApiModelProperty(dataType = "string", example = "leonardo@gmail.com", value = "Correo del cliente")
	private String clientEmail;

	@ApiModelProperty(dataType = "string", example = "Leonardo Carrillo", value = "Nombre del cliente")
	private String clientName;

	@ApiModelProperty(dataType = "string", allowableValues = "CC, TI, CE, PS, NI, CD, NU", value = "Tipos de documentos permitidos")
	private TypeDocument asesorTypeDocument;

	@ApiModelProperty(dataType = "string", example = "1007584455", value = "Numero de documento del asesor")
	private String asesorDocument;

	@ApiModelProperty(dataType = "string", example = "7629929", value = "Codigo del asesor")
	private String asesorCod;

	@ApiModelProperty(dataType = "string", example = "Elmer Franco", value = "Nombre del asesor")
	private String asesorName;

	private String asesorSignum;

	@ApiModelProperty(value = "Objecto JSON usado para crear la bussines interaction")
	private transient Map<String, Object> bi;

}