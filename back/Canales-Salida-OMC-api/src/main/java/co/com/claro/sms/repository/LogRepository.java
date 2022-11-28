package co.com.claro.sms.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import co.com.claro.sms.entity.Log;

public interface LogRepository extends MongoRepository<Log, String> {
	
	@Query("{'date' : { $gte: ?0, $lte: ?1 } }")                 
	public List<Log> filterByDate(Date from, Date to); 

}
