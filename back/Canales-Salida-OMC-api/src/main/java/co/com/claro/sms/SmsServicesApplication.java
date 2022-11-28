package co.com.claro.sms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.scheduling.annotation.EnableAsync;

import co.com.claro.sms.properties.MessageRequestProperties;
import lombok.extern.slf4j.Slf4j;

@EnableRetry
@EnableAsync
@SpringBootApplication
@Slf4j
public class SmsServicesApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SmsServicesApplication.class, args);
	}

	@Autowired
	private MessageRequestProperties messageRequestProperties;

	@Override
	public void run(String... args) throws Exception {

		log.info("properties... {}", messageRequestProperties);
	}

}
