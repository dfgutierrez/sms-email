package co.com.claro.sms.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.com.claro.sms.exception.BussinesException;

public class Util {

	private Util() {
		throw new BussinesException("Utility class");
	}

	public static String dateToString(Date date, String format) {

		final var dateFormat = new SimpleDateFormat(format);
		return dateFormat.format(date);

	}

	public static String objectToJson(Object object) throws JsonProcessingException {

		final var mapper = new ObjectMapper();
		return mapper.writeValueAsString(object);

	}

}
