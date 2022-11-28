package co.com.claro.sms.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;

import co.com.claro.sms.entity.Log;
import co.com.claro.sms.repository.LogRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class LogService {

	@Autowired
	private LogRepository logRepository;

	@Async
	@Retryable(value = { Exception.class }, maxAttempts = 2, backoff = @Backoff(1000))
	public void insert(Log insertLog) {

		final var stopWatch = new StopWatch();
		stopWatch.start();

		try {

			log.info("[[Start]] (insert) log: {}", insertLog);
			final var insert = logRepository.insert(insertLog);
			log.info("new Log: {}", insert);
		} finally {
			stopWatch.stop();
			log.info("[[end]] (insert) el servicio tardo {} milisegundos", stopWatch.getTotalTimeMillis());
		}

	}

	@Recover
	public void retrycreateHeader(Exception e, Log insertLog) {
		log.error("createHeader Exception: {}", e.getMessage(), e);
	}

	public List<Log> findByDate() {

		final var calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.set(Calendar.MILLISECOND, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.HOUR, 0);

		final var startDate = calendar.getTime();

		calendar.setTime(new Date());
		calendar.set(Calendar.MILLISECOND, 0);
		calendar.set(Calendar.SECOND, 59);
		calendar.set(Calendar.MINUTE, 59);
		calendar.set(Calendar.HOUR, 23);

		final var endDate = calendar.getTime();

		return logRepository.filterByDate(startDate, endDate);

	}

}
