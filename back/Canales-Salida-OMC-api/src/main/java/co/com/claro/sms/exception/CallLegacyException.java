package co.com.claro.sms.exception;

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