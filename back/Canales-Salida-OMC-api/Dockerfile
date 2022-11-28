FROM adoptopenjdk:11-jre-openj9

VOLUME /tmp
EXPOSE 8080

COPY ./target/sms-services-1.0.0-SNAPSHOT.jar ./

ENTRYPOINT ["java","-jar","./sms-services-1.0.0-SNAPSHOT.jar"]