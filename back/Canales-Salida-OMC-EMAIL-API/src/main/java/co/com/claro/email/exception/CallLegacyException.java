package co.com.claro.email.exception;

public class CallLegacyException extends RuntimeException {

	public CallLegacyException(String message) {
		super(message);
	}

	public CallLegacyException(Throwable cause) {
		super(cause);
	}

	public CallLegacyException(String message, Throwable cause) {
		super(message, cause);
	}

}
