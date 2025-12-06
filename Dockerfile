# Use official Eclipse Temurin JDK 21 image
FROM eclipse-temurin:21-jdk-jammy

# Set working directory inside container
WORKDIR /app

# Copy Gradle wrapper and build files first for caching
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Copy source code
COPY src src

# Make file executable
RUN chmod 700 ./gradlew

# Build the Spring Boot application
RUN ./gradlew clean bootJar --no-daemon

# Expose default Spring Boot port
EXPOSE 8080

# Default environment variables (can be overridden)
ENV SPRING_PROFILES_ACTIVE=prod

# Run the built jar
ENTRYPOINT ["sh", "-c", "java -jar build/libs/*.jar"]
