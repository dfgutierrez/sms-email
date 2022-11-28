package co.com.claro.sms.exception;

public class BussinesException extends RuntimeException {

	public BussinesException(String message) {
		super(message);
	}

	public BussinesException(Throwable cause) {
		super(cause);
	}

	public BussinesException(String message, Throwable cause) {
		super(message, cause);
	}

}
